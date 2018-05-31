"use strict";

const puppeteer = require("puppeteer");
const extract = require("./extract");
const cleanup = require("./cleanup");

exports.handler = async (event, context, callback) => {
  console.log("start puppeteer");
  const executablePath = await extract();
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--no-zygote",
      "--no-sandbox"
    ],
    executablePath
  });
  console.log("newpage");
  const page = await browser.newPage();
  await page.goto("https://yahoo.co.jp");
  await page.screenshot({ path: "/tmp/example.png" });
  await browser.close();
  await cleanup();
  console.log("end puppeteer");
};
