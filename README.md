- This is a [Next.js](https://nextjs.org/) project.
- A [open API](https://data.rijksmuseum.nl/object-metadata/api/) that offers a wide range of interesting possibilities.
- The style was done with [scss modules](https://yarnpkg.com/package/sass).
- The image cache and optimization was done by using [next/image](https://nextjs.org/docs/api-reference/next/image) (try searching, going one page further and back again).
- The website is currently hosted in Vercel on https://rijksmuseum-psi.vercel.app/.
- Because the website is a proof of concept it does not follow a design.

## To be done

- ~~Hide the api key on `.local.dev` and load dinamically.~~
- Create/follow a design.
- Improve the search engine filtering.
- Add loading states.
- More info on the art details.
- Last page rule (don't show the `Next` button).
- Pass the filter parameters via url. This allows the user going back to the same filter via page history, sharing the url, etc.

## Getting Started

Install the packages:

```bash
yarn
```

Add your API KEY for rijksmuseum api. Base yourself in `.env.local.example` file. You can follow [this guide](https://data.rijksmuseum.nl/object-metadata/api/#access-to-apis) to get your own API key.

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
