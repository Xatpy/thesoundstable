# The Sounds Table

The Sounds Table is a React soundboard for memorable clips from Spanish creators.
Board metadata lives in `src/data`; audio remains hosted separately under `sounds` and
is loaded only when a visitor presses a clip.

## Development

Install dependencies with Corepack (the repository uses Yarn Classic):

```sh
corepack yarn install --frozen-lockfile
```

Useful commands:

```sh
corepack yarn start
corepack yarn test:ci
corepack yarn build
```

## Adding or changing a board

1. Add or update a JSON file in `src/data` with `title` and `sounds` fields.
2. Add its lazy loader and route aliases in `src/components/BoardPage.tsx` and `src/index.tsx`.
3. Add it to the index page and sitemap source when it should be publicly discoverable.
4. Run `corepack yarn test:ci` and `corepack yarn build`.

## Performance model

Board JSON is loaded per route. Audio instances are created only after the user selects a
clip and are released when the board unmounts. The app shell service worker caches only
same-origin assets; moving audio to a first-party CDN is the next step before enabling
offline audio caching.

To switch GitHub-hosted audio to a CDN without editing the JSON files, set
`REACT_APP_AUDIO_CDN_URL` at build time to the CDN URL whose object layout mirrors this
repository (for example, `https://media.example.com`). The CDN must permit browser CORS
requests and should use long-lived immutable cache headers for versioned audio objects.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
