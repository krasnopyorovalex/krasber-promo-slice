"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import svg from "gulp-svg-sprite";
import debug from "gulp-debug";
import replace from "gulp-replace";
import browsersync from "browser-sync";

gulp.task("sprites", () => {
    return gulp.src(paths.sprites.src)
        .pipe(replace('class="primary"', 'fill="var(--primary)"'))
        .pipe(svg({
            shape: {
                dest: "intermediate-svg"
            },
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(paths.sprites.dist))
        .pipe(debug({
            "title": "Sprites"
        }))
        .on("end", browsersync.reload);
});
