# js-screensaver

## NPM

```
npm install github:rickvanderwolk/js-screensaver


import { startScreensaver } from 'js-screensaver'

startScreensaver({
  text: 'My custom text',
  timeout: 5
})
```

## CDN or manual download

```
<script src="https://cdn.jsdelivr.net/gh/rickvanderwolk/js-screensaver/main.js"></script>
```

Or manually download script + include from local path

```
<script src="/assets/js/js-screensaver/main.js"></script>
```

### Change parameters

Parameters can be changed by using URL parameters.

#### Text

Set text (URL encoded, for example: use %20 instead of a space)

```
<script src="https://cdn.jsdelivr.net/gh/rickvanderwolk/js-screensaver/main.js?text=My%20custom%20text"></script>
```

#### Timeout

Set timeout (in seconds, default is 25)

```
<script src="https://cdn.jsdelivr.net/gh/rickvanderwolk/js-screensaver/main.js?timeout=5"></script>
```
