import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, route: string) {
  await page.goto(route, { waitUntil: "networkidle" });
  // Development controls must not cover the site's mobile buttons.
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
}

async function expectNoOverflow(page: Page) {
  const size = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(size.content).toBeLessThanOrEqual(size.viewport + 1);
}

test("صفحات الموقع تبقى داخل عرض الموبايل", async ({ page }) => {
  for (const route of [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/orders",
    "/orders/MV-240731",
    "/orders/MV-240732",
    "/orders/MV-240733",
  ]) {
    await test.step(route, async () => {
      await open(page, route);
      if (route.startsWith("/orders/")) {
        await expect(
          page.getByRole("heading", { name: "تفاصيل الطلب", exact: true }),
        ).toBeVisible();
      } else if (route === "/orders") {
        await expect(page.locator("article").first()).toBeVisible();
      }
      await expectNoOverflow(page);
    });
  }
});

test("بوكسات الحجز بهوامش جانبية وخطوة الرحلة تبدأ من الأعلى", async ({
  page,
}, testInfo) => {
  await open(page, "/booking");
  await page.getByRole("button", { name: "التالي: بيانات الرحلة" }).click();
  await expect(
    page.getByRole("heading", { name: "من أين نأخذ مركبتك؟" }),
  ).toBeInViewport();
  for (const card of await page.locator("main section").all()) {
    const bounds = await card.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(23);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(
      page.viewportSize()!.width - 23,
    );
  }
  await expectNoOverflow(page);
  await testInfo.attach("بيانات الرحلة", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
  await page.getByRole("button", { name: "عرض التكلفة والملخص" }).click();
  await expect(
    page.getByRole("button", { name: "تأكيد الطلب", exact: true }),
  ).toBeVisible();
  await expectNoOverflow(page);
});

test("كروت الحساب بأيقونات صغيرة ونموذج التسجيل لا يخرج من الشاشة", async ({
  page,
}, testInfo) => {
  await open(page, "/signup");
  for (const name of ["تسجيل حساب فردي", "تسجيل حساب شركة"]) {
    const card = page.getByRole("button", { name });
    const icon = await card.locator("svg").first().boundingBox();
    expect(icon!.width).toBeLessThanOrEqual(24);
    await card.click();
    await expect(
      page.getByRole("button", { name: "إنشاء الحساب", exact: true }),
    ).toBeVisible();
    await expectNoOverflow(page);
    await page
      .getByRole("button", { name: "إنشاء الحساب", exact: true })
      .click();
    await expect(page.getByRole("alert").first()).toBeVisible();
    await expectNoOverflow(page);
    await testInfo.attach(name, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
    await page.getByRole("button", { name: "العودة", exact: true }).click();
  }
});

test("حقل الشات وزر الإرسال يفضلوا ظاهرين على الشاشة القصيرة", async ({
  page,
}) => {
  await open(page, "/orders/MV-240731/chat");
  await expect(page.getByRole("log")).toBeVisible();
  await page.setViewportSize({
    width: page.viewportSize()!.width,
    height: 500,
  });
  const input = page.getByRole("textbox", { name: "رسالتك" });
  await expect(input).toBeInViewport();
  await input.fill("اختبار عرض المحادثة على الموبايل");
  await page.getByRole("button", { name: "حفظ الرسالة في المحادثة" }).click();
  await expect(
    page
      .getByRole("log")
      .getByText("اختبار عرض المحادثة على الموبايل", { exact: true }),
  ).toBeVisible();
  await expectNoOverflow(page);
});
