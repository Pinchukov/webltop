# Site template for Jekyll - WeblTOP

Version: 1.0

- Front end framework: UIKit3
- Gulp: Yes
- Sass: Yes
- Recommended web-hosting for Jekyll: LandingHost.ru

## Starting a template on jekyll

1. Download the template to your computer.
2. In the project folder, run the `bash` terminal (preferably it).
3. Install `gulp` locally and the necessary packages in the project.
4. Run `gulp` or `gulp watch` command.
5. Run the second `bash` terminal and enter the command `jekyll b`.
6. In the browser, type the address `localhost:3000` and press Enter!
7. Website template works!

## Interesting and useful WeblTOP features

* Automatic image processing and compression-there is a configured task in `gulpfile.js` with connected `gulp-imagemin` and `imagemin-pngquant` is executed by `gulp img` command.
* Upload your finished website to your hosting has a customized task to diploy your project to your hosting, carer `gulp-rsync`. Settings are configured in the `gulpfile.js` in the task `rsync` which is executed by `gulp rsync`.


Website template WeblTOP developed Sergey Pinchukov!

https://pinchukov.net/templates/webltop.html