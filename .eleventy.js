const CleanCSS = require("clean-css");
const MarkdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");

  const mdRender = new MarkdownIt();
  eleventyConfig.addFilter("markdown", function(rawString) {
    return mdRender.render(rawString);
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addShortcode("image", async function(url) {
    const stats = await Image(url, {
      widths: [400, 900, 1400, "auto"],
      outputDir: "_site/img/",
      sharpWebpOptions: { quality: 100 },
      sharpJpegOptions: { quality: 100 },
    });

    return (`
      <img
        alt=""
        width="${stats.webp.at(-1).width}"
        height="${stats.webp.at(-1).height}"
        loading="lazy"
        srcset="${stats.webp.map(s => s.srcset).join(", ")}"
        sizes="(min-width: 120ch) 80ch"
      />`
    );
  });
};
