var Canvas = {
    canvas : null,
    context : null,
    init: function() {
      this.bindEvents();
      this.addIcon();
    },
    bindEvents: function() {         
      $('#canvas-tool').on('click', '.step-head',this.selectStep);
      $('#frame-panel').on('click', '.frame',this.selectFrame);
      $('#reset_btn').on('click',this.selectFrame);
      $('#complete_btn').on('click',this.genSVG);
    },
    selectStep: function() {    
      var step = $(this).parents(".step");   
      var mode = step.attr("mode");   
      if (step.hasClass("select")) {
        step.removeClass("select");
        $("#canvas-tool").removeClass("open");
      }
      else{
        $(".step").removeClass("select");
        $("#canvas-tool").addClass("open");
        step.addClass("select");
      }
    },
    selectFrame: function() {           
      var src = $(this).attr("data-src");
      $('.frame').removeClass("select");
      if (!$(this).hasClass("btn-re")) {
        $(this).addClass("select");
      }
      else{
        $('#frame-panel').find(".frame").eq(0).addClass("select");
      }
      Canvas.drawPhoto(src);
    },
    drawPhoto: function(photo) {
      Canvas.canvas  = document.getElementById('myCanvas');
      Canvas.context = Canvas.canvas.getContext('2d');
     
      Canvas.context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
      document.getElementById('canvasImg').src = "";
      if(photo != null){
        var imageObj = new Image();
        imageObj.onload = function() {
          Canvas.context.drawImage(imageObj, 0, 0);
        };
        imageObj.src = photo;
      }
    },
    addIcon: function(Icon) {
      Canvas.canvas  = document.getElementById('myCanvas');
      Canvas.context = Canvas.canvas.getContext('2d');
      var imageObj = new Image();
      var imageIcon = new Image();

      imageObj.onload = function() {
        Canvas.context.drawImage(imageObj, 0, 0);
      };
      imageObj.src = '/assets/images/persoanlisation/SVG/WHITE-SVG-01.svg';


      imageIcon.onload = function() {
        Canvas.context.drawImage(imageIcon, 200, 100,50,50);
      };
      imageIcon.src = '/assets/images/persoanlisation/SVG/icon.svg';


      Canvas.context.font = 'italic 30pt Calibri,ansana';

      Canvas.context.fillStyle = '#b3b3b3';
      Canvas.context.lineWidth = 2;
      // stroke color
      Canvas.context.strokeStyle = '#939393';
      Canvas.context.fillText('Hello World!', 70, 90);
      Canvas.context.strokeText('Hello World!', 70, 90);
    },
    dragandDrop: function(){
      var width = 421;
      var height = 265;

      function update(activeAnchor) {
          var group = activeAnchor.getParent();

          var topLeft = group.get('.topLeft')[0];
          var topRight = group.get('.topRight')[0];
          var bottomRight = group.get('.bottomRight')[0];
          var bottomLeft = group.get('.bottomLeft')[0];
          var image = group.get('Image')[0];

          var anchorX = activeAnchor.getX();
          var anchorY = activeAnchor.getY();

          // update anchor positions
          switch (activeAnchor.getName()) {
              case 'topLeft':
                  topRight.setY(anchorY);
                  bottomLeft.setX(anchorX);
                  break;
              case 'topRight':
                  topLeft.setY(anchorY);
                  bottomRight.setX(anchorX);
                  break;
              case 'bottomRight':
                  bottomLeft.setY(anchorY);
                  topRight.setX(anchorX);
                  break;
              case 'bottomLeft':
                  bottomRight.setY(anchorY);
                  topLeft.setX(anchorX);
                  break;
          }

          image.position(topLeft.position());

          var width = topRight.getX() - topLeft.getX();
          var height = bottomLeft.getY() - topLeft.getY();
          if(width && height) {
              image.width(width);
              image.height(height);
          }
      }
      function addAnchor(group, x, y, name) {
          var stage = group.getStage();
          var layer = group.getLayer();

          var anchor = new Konva.Circle({
              x: x,
              y: y,
              stroke: '#666',
              fill: '#ddd',
              strokeWidth: 2,
              radius: 8,
              name: name,
              draggable: true,
              dragOnTop: false
          });

          anchor.on('dragmove', function() {
              update(this);
              layer.draw();
          });
          anchor.on('mousedown touchstart', function() {
              group.setDraggable(false);
              this.moveToTop();
          });
          anchor.on('dragend', function() {
              group.setDraggable(true);
              layer.draw();
          });
          // add hover styling
          anchor.on('mouseover', function() {
              var layer = this.getLayer();
              document.body.style.cursor = 'pointer';
              this.setStrokeWidth(4);
              layer.draw();
          });
          anchor.on('mouseout', function() {
              var layer = this.getLayer();
              document.body.style.cursor = 'default';
              this.setStrokeWidth(2);
              layer.draw();
          });

          group.add(anchor);
      }

      var stage = new Konva.Stage({
          container: 'myCanvas',
          width: width,
          height: height
      });

      var layer = new Konva.Layer();
      stage.add(layer);

      // darth vader
      var darthVaderImg = new Konva.Image({
          width: 200,
          height: 137
      });

      // yoda
      var yodaImg = new Konva.Image({
          width: 93,
          height: 104
      });

      var darthVaderGroup = new Konva.Group({
          x: 180,
          y: 50,
          draggable: true
      });
      layer.add(darthVaderGroup);
      darthVaderGroup.add(darthVaderImg);
      addAnchor(darthVaderGroup, 0, 0, 'topLeft');
      addAnchor(darthVaderGroup, 200, 0, 'topRight');
      addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
      addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

      var yodaGroup = new Konva.Group({
          x: 20,
          y: 110,
          draggable: true
      });
      layer.add(yodaGroup);
      yodaGroup.add(yodaImg);
      addAnchor(yodaGroup, 0, 0, 'topLeft');
      addAnchor(yodaGroup, 93, 0, 'topRight');
      addAnchor(yodaGroup, 93, 104, 'bottomRight');
      addAnchor(yodaGroup, 0, 104, 'bottomLeft');

      var imageObj1 = new Image();
      imageObj1.onload = function() {
          darthVaderImg.image(imageObj1);
          layer.draw();
      };
      imageObj1.src = '/assets/images/persoanlisation/SVG/icon.svg';

      var imageObj2 = new Image();
      imageObj2.onload = function() {
          yodaImg.image(imageObj2);
          layer.draw();
      };
      imageObj2.src = '/assets/images/persoanlisation/SVG/icon.svg';
    },
    genSVG: function(){
        var dataURL = Canvas.canvas.toDataURL("image/png");
        console.log(dataURL);

      // set canvasImg image src to dataURL
      // so it can be saved as an image
      document.getElementById('canvasImg').src = dataURL;
      var image = dataURL.replace("image/png", "image/octet-stream");
      // window.location.href=image;

       $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

     var svg = $("#myCanvas").html();
     var b64 = Base64.encode(svg); // or use btoa if supported

     // Works in recent Webkit(Chrome)
     $("body").append($("<img src='data:image/svg+xml;base64,\n"+b64+"' alt='file.svg'/>"));

     // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
     $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"' title='file.svg'>Download</a>"));
        }
};
Canvas.init();