"""Keyboard, pointer, focus, and modal acceptance checks for slide images."""

from __future__ import annotations

import os
import re

from playwright.sync_api import Page, expect, sync_playwright

BASE_URL = os.environ.get("SLIDES_TEST_BASE", "http://127.0.0.1:8000")


def show_slide(page: Page, slide_id: str):
    slide = page.locator(f'section.slide[data-slide="{slide_id}"]')
    number = slide.get_attribute("data-slide-num")
    assert number is not None
    page.evaluate("number => { location.hash = number; }", number)
    expect(slide).to_have_class(re.compile(r"\bactive\b"))
    return slide


def expect_focus_inside(page: Page, selector: str) -> None:
    assert page.evaluate(
        "selector => document.querySelector(selector).contains(document.activeElement)",
        selector,
    )


def test_static_image_keyboard_and_modal(page: Page) -> None:
    slide = show_slide(page, "tier-1")
    image = slide.locator(".stage img").first
    dialog = page.get_by_role("dialog", name="Zoomed slide image")
    close = page.get_by_role("button", name="Close zoomed image")

    expect(image).to_have_attribute("role", "button")
    expect(image).to_have_attribute("tabindex", "0")
    image.focus()
    expect(image).to_be_focused()
    image.press("Enter")

    expect(dialog).to_be_visible()
    expect(close).to_be_focused()
    expect(page.locator("body")).to_have_class(re.compile(r"\blightbox-open\b"))
    current_hash = page.evaluate("location.hash")
    page.mouse.wheel(200, 0)
    expect(dialog).to_be_visible()
    expect(slide).to_have_class(re.compile(r"\bactive\b"))
    assert page.evaluate("location.hash") == current_hash
    page.locator("#btn-next").evaluate("element => element.focus()")
    expect_focus_inside(page, "#image-lightbox")
    for _ in range(3):
        page.keyboard.press("Tab")
        expect_focus_inside(page, "#image-lightbox")

    page.keyboard.press("Escape")
    expect(dialog).to_be_hidden()
    expect(image).to_be_focused()


def test_active_gallery_pointer_and_keyboard(page: Page) -> None:
    slide = show_slide(page, "review-tool")
    items = slide.locator(".gallery-item")
    dots = slide.locator(".gallery-dot")
    dialog = page.get_by_role("dialog", name="Zoomed slide image")

    expect(items.nth(0)).to_have_attribute("tabindex", "0")
    expect(items.nth(1)).to_have_attribute("tabindex", "-1")
    expect(items.nth(1)).to_have_attribute("aria-hidden", "true")
    expect(dots.nth(0)).to_have_attribute("aria-pressed", "true")

    dots.nth(1).click()
    expect(items.nth(0)).to_have_attribute("aria-hidden", "true")
    expect(items.nth(1)).to_have_attribute("tabindex", "0")
    expect(items.nth(1)).not_to_have_attribute("aria-hidden", "true")
    expect(dots.nth(1)).to_have_attribute("aria-pressed", "true")

    items.nth(1).click()
    expect(dialog).to_be_visible()
    dialog.click(position={"x": 4, "y": 4})
    expect(dialog).to_be_hidden()
    expect(items.nth(1)).to_be_focused()

    items.nth(1).press("Space")
    expect(dialog).to_be_visible()
    current_hash = page.evaluate("location.hash")
    page.get_by_role("button", name="Close zoomed image").tap()
    expect(dialog).to_be_hidden()
    expect(slide).to_have_class(re.compile(r"\bactive\b"))
    assert page.evaluate("location.hash") == current_hash
    expect(items.nth(1)).to_be_focused()


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            page = browser.new_page(
                viewport={"width": 1440, "height": 900}, has_touch=True
            )
            errors: list[str] = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.goto(BASE_URL, wait_until="domcontentloaded")
            test_static_image_keyboard_and_modal(page)
            print("PASS test_static_image_keyboard_and_modal", flush=True)
            test_active_gallery_pointer_and_keyboard(page)
            print("PASS test_active_gallery_pointer_and_keyboard", flush=True)
            assert errors == [], errors
        finally:
            browser.close()


if __name__ == "__main__":
    main()
