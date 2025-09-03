const {normalizeURL, getURLsFromHTML} = require("./crawl")
const {test , expect} = require("@jest/globals")

test('normalizeURL strip protocol',()=>{
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slashes',()=>{
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals',()=>{
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http',()=>{
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute',()=>{
    const inputHtmlBody = `
     <html>
        <body>
           <a href = "https://blog.boot.dev/path/">
             Boot.dev Blog
           </a>
        </body>
     </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative',()=>{
    const inputHtmlBody = `
     <html>
        <body>
           <a href = "/path/">
             Boot.dev Blog
           </a>
           <a href = "https://blog.boot.dev">
             Boot.dev Blog
           </a>
        </body>
     </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/","https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid',()=>{
    const inputHtmlBody = `
     <html>
        <body>
           <a href = "invalid">
             Boot.dev Blog
           </a>
        </body>
     </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected)
})