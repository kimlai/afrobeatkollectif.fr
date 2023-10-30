const EleventyFetch = require("@11ty/eleventy-fetch");

const token = process.env.AIRTABLE_TOKEN;

module.exports = async function() {
  const data = await EleventyFetch("https://api.airtable.com/v0/appkjwOHHv8MI1v9N/Sections", {
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: { "Authorization": `Bearer ${token}` }
    }
  });

  // transform the array of record into an Object indexed by ID
  // [{ ID: about, content: ... }] => { about: { content: ... } }
  return data.records.reduce((result, record) => ({...result, [record.fields.ID]: record.fields}), {});
};
