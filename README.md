# gulp-pottopo

> Generate a default PO translation from GNU Gettext POT files.

## Install

Install with [npm](https://npmjs.org/package/gulp-pottopo)

```bash
npm install gulp-pottopo --save-dev
```

## Example

```js
var gulp = require('gulp');
var pottopo = require('gulp-pottopo');

gulp.task('pottopo', function () {
    return gulp.src('languages/*.pot', {base: '.'})
        .pipe(pottopo({
            // optional parameters
        }))
        .pipe(gulp.dest('.'));
});
```

The output file will be renamed to [Filename without extension][Separator option][Language option].po, meaning `translation.pot` with default language becomes `translation-en_US.po`.

## Options

* `language`: Language code for the generated file. Default: `en_US`.
* `separator`: Character that separates the filename from the language code. Default: `-`.
