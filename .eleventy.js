const CleanCSS = require("clean-css");
const MarkdownIt = require("markdown-it");

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
};
