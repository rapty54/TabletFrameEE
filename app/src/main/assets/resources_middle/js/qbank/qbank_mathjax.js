MathJax.Hub.Config({   
      styles: { 
          ".MathJax_Display": { 
            "font-weight": "normal", "font-size": "300%", 
            "font-family" : "Times New Roman",
            "text-align" : "center",          
          }  ,          
          ".MathJax .merror": {
              "background-color": "#FFFF88"
              , color:   "#CC0000"
              , border:  "1px solid #CC0000"
              , padding: "1px 3px"
              , "font-style": "normal"
              , "font-size":  "100%"
              , "font-family" : "Times New Roman"
          },
          ".MathJax .mtext" : { "font-family": "Times New Roman ! important"},
      },      
      "HTML-CSS": {
          scale: 100
          , mtextFontInherit: true
          , preferredFont: "TeX"
          , imageFont: null
          , "mtextFontInherit": true
          , "font-family" : "Times New Roman"
          , linebreaks: { automatic: true }
          , extensions: ["handle-floats.js"]
      },
      MMLorHTML: { prefer: { MSIE: "MML", Firefox: "HTML", Opera: "HTML", other: "HTML" } },
      showMathMenu: false
    });