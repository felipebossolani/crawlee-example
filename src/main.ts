// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee';

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, log, pushData }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        const links = await page.$$eval('.css-m5ahyg a.css-9mylee', anchors => 
            anchors.map(anchor => anchor.href)
        );

        console.log(links);

        // Save results as JSON to ./storage/datasets/default
        await pushData({ links, url: request.loadedUrl });
    },    
    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 20,
    // Uncomment this option to see the browser window.
    // headless: false,
});

// Add first URL to the queue and start the crawl.
await crawler.run(['https://www.nytimes.com/']);
