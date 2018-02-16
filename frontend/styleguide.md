#Css use postCss plugins.
1.postcss-custom-properties

        Using this input.css:
        :root {
          --color: red;
        }
        div {
          color: var(--color);
        }
        You will get:
        div {
          color: red;
        }
2.postcss-import

        Using:
        @import "cssrecipes-defaults";
3.postcss-focus

        Using this input.css:
        .button:hover {
            background: red;
        }
        You will get:
        .button:hover, .button:focus {
            background: red;
        }
        
4.postcss-custom-media

        Using this input.css:
        @custom-media --small-viewport (max-width: 30em);
        @media (--small-viewport) {
          /* styles for small viewport */
        }
        You will get:
        @media (max-width: 30em) {
          /* styles for small viewport */
        }
5.postcss-media-minmax

        Using this input.css:
        @media screen and (width >= 500px) and (width <= 1200px) {
          .bar {
            display: block;
          }
        }
        /* Or */
        @media screen and (500px <= width <= 1200px) {
          .bar {
            display: block;
          }
        }
        /* Or */
        @media screen and (1200px >= width >= 500px) {
          .bar {
            display: block;
          }
        }
        You will get:
        @media screen and (min-width: 500px) and (max-width: 1200px) {
          .bar {
            display: block;
          }
        }
6.postcss-custom-selectors

        Using this input.css:
        @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        article :--heading + p {
          margin-top: 0;
        }
        You will get:
        article h1 + p,
        article h2 + p,
        article h3 + p,
        article h4 + p,
        article h5 + p,
        article h6 + p {
          margin-top: 0;
        }
7.postcss-nested

        Using this input.css:
        .phone {
            &_title {
                width: 500px;
                @media (max-width: 500px) {
                    width: auto;
                }
                body.is_dark & {
                    color: white;
                }
            }
            img {
                display: block;
            }
        }
        /* after postcss-nested */
        .phone_title {
            width: 500px;
        }
        @media (max-width: 500px) {
            .phone_title {
                width: auto;
            }
        }
        body.is_dark .phone_title {
            color: white;
        }
        .phone img {
            display: block;
        }
9.const inlineSvgCss = require('postcss-inline-svg');

10.const url = require("postcss-url");