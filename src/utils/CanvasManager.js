class CanvasManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.data = {};
    this.imageCache = {};
    this.render = this.render.bind(this);
  }


//  The `setData` function sets the data property of an object and then triggers a render method.

  setData(data) {
    this.data = data;
    this.render();
  }



//  The `clearCanvas` function clears the entire content of a canvas element.

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }



/**
 * The drawBackground function sets the background color of a canvas element.
 */
  drawBackground() {
    const { backgroundColor } = this.data;
    this.context.fillStyle = backgroundColor || '#0369A1';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

/**
 * The function `drawDesignPattern` loads and draws a design pattern image onto a canvas element.
 */
  drawDesignPattern() {
    const { design_pattern } = this.data.urls;
    if (design_pattern) {
      const img = this.imageCache[design_pattern] || new Image();
      if (!this.imageCache[design_pattern]) {
        img.onload = () => {
          this.imageCache[design_pattern] = img;
          this.render();
        };
        img.src = design_pattern;
      }
      if (this.imageCache[design_pattern]) {
        this.context.drawImage(img, 0, 0);
      }
    }
  }

/**
 * The `drawMask` function checks if a mask image exists in the data, loads it if necessary, and then
 * renders it on the canvas.
 */
  drawMask() {
    const { mask } = this.data.urls;
    if (mask) {
      const img = this.imageCache[mask] || new Image();
      if (!this.imageCache[mask]) {
        img.onload = () => {
          this.imageCache[mask] = img;
          this.render();
        };
        img.src = mask;
      }
      if (this.imageCache[mask]) {
        this.context.drawImage(img, 0, 0);
      }
    }
  }

/**
 * The function `drawUserImage` in JavaScript loads and draws a user image within a specified mask area
 * on a canvas.
 */
  drawUserImage() {
    const { userImage } = this.data.urls;
    const { x, y, width, height } = this.data.image_mask;
    if (userImage) {
      const img = this.imageCache[userImage] || new Image();
      if (!this.imageCache[userImage]) {
        img.onload = () => {
          this.imageCache[userImage] = img;
          this.render();
        };
        img.src = userImage;
      }

      if (this.imageCache[userImage]) {
        this.context.save();
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.clip();
        this.context.drawImage(this.imageCache[userImage], x, y, width, height);

        // Restore the context state to remove the clipping mask
        this.context.restore(); 
      }
    }
  }

/**
 * The function `drawMaskStroke` checks if a stroke image is available, loads it if necessary, and then
 * renders it on a canvas context.
 */
  drawMaskStroke() {
    const { stroke } = this.data.urls;
    if (stroke) {
      const img = this.imageCache[stroke] || new Image();
      if (!this.imageCache[stroke]) {
        img.onload = () => {
          this.imageCache[stroke] = img;
          this.render();
        };
        img.src = stroke;
      }
      if (this.imageCache[stroke]) {
        this.context.drawImage(img, 0,0);
      }
    }
  }

/**
 * The `drawText` function draws a caption and call-to-action elements based on the provided data.
 */
  drawText() {
    const { caption, cta } = this.data;
    if (caption) {
        this.drawTextElement(caption);
    }
    if (cta) {
        this.drawCTAElement(cta);
    }
}

/**
 * The `fragmentText` function splits a given text into lines based on a maximum width for each line.
 */
fragmentText(text, maxWidth) {
  var words = text.split(' '),
      lines = [],
      line = "";

  while (words.length > 0) {
    if (line.length + words[0].length <= maxWidth) {
      line += words.shift() + " ";
    } else {
      lines.push(line);
      line = "";
    }
    if (words.length === 0) {
      lines.push(line);
    }
  }
  return lines;
}


/**
 * The `drawTextElement` function in JavaScript draws text elements with specified properties such as
 * text content, position, font size, color, alignment, and maximum characters per line.
 */
 drawTextElement(element) {
  const { text, position, font_size, text_color, alignment = 'left', max_characters_per_line } = element;
  const { x, y } = position;
  const lineHeight = (font_size/100 )*25;
  var lines = this.fragmentText(text, max_characters_per_line);
  lines.forEach((line, i) => {
    this.context.fillStyle = text_color;
    this.context.font=`bold ${font_size}px Arial`;

    this.context.textAlign=alignment
    this.context.fillText(line, x, y + (i + 1)*(lineHeight+font_size));
  });
}



/**
 * The function `drawCTAElement` in JavaScript draws a Call-to-Action (CTA) element with specified
 * text, position, font size, background color, and wrapping length.
 */
drawCTAElement(element) {
  const { text, position, font_size = 30, background_color, wrap_length = 20 } = element;
  const { x, y } = position;
  const padding = 24;
  this.context.font = `${font_size}px Arial`;
  const textWidth = this.context.measureText(text).width;
  const maxWidth = wrap_length * font_size;
  const adjustedFontSize = Math.min(font_size, maxWidth / textWidth * font_size);
  this.context.font = `bold ${adjustedFontSize}px Arial`;
  const rectWidth = textWidth + 2 * padding;
  const rectHeight = adjustedFontSize + 2 * padding;
  const textX = x + rectWidth / 2;
  const textY = y + rectHeight / 2;
  this.context.fillStyle = background_color;
  this.roundRect(this.context, x, y, rectWidth, rectHeight, 10, true, false);
  const { backgroundColor } = this.data;
  this.context.fillStyle = backgroundColor;
  this.context.textAlign = 'center';
  this.context.textBaseline = 'middle';
  this.context.fillText(text, textX, textY, maxWidth);
}

/**
 * The function `roundRect` draws a rounded rectangle with specified dimensions, radius, fill, and
 * stroke options in a canvas context.
 */
roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.lineTo(x + width - radius, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.context.lineTo(x + width, y + height - radius);
    this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.context.lineTo(x + radius, y + height);
    this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.context.lineTo(x, y + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.closePath();
    if (fill) {
        this.context.fill();
    }
    if (stroke) {
        this.context.stroke();
    }
}

/**
 * The render function clears the canvas, draws the background, design pattern, mask, mask stroke, user
 * image, and text in a specific order.
 */
  render() {
    this.clearCanvas();
    this.drawBackground();
    this.drawDesignPattern();
    this.drawMask();
    this.drawMaskStroke();
    this.drawUserImage();
    this.drawText();
  }
}

export default CanvasManager;
