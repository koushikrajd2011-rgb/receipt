import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1060,
  seed: 27,
};

export function drawReceipt(p) {
  const w = p.width;
  const margin = 30;

  p.background(255);
  p.textFont("monospace");

  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);

  p.textSize(34);
  p.text("MIDNIGHT", w / 2, 28);

  p.textSize(34);
  p.text("CITY", w / 2, 63);

  p.textStyle(p.NORMAL);
  p.textSize(8);
  p.text("02:17 AM // LAST TRAIN GONE", w / 2, 108);

  dashedLine(p, margin, 135, w - margin, 135, 6, 5);

  drawCity(p, 155, 760);

  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);

  p.textSize(12);
  p.text("NEXT TRAIN", w / 2, 790);

  p.textSize(32);
  p.text("05:04", w / 2, 815);

  dashedLine(p, margin, 930, w - margin, 930, 6, 5);

  const barcodeValue = "receipt.hackclub.com";
  drawBarcode(p, barcodeValue, w / 2, 960);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1024);
}

function drawCity(p, top, bottom) {
  drawStars(p, top, top + 220);

  drawMoon(p, 302, top + 90);

  drawBackCity(p, bottom);
  drawMiddleCity(p, bottom);
  drawFrontCity(p, bottom);

  drawPowerLines(p, top, bottom);

  drawBridge(p, bottom - 70);

  p.stroke(0);
  p.strokeWeight(4);
  p.line(0, bottom, p.width, bottom);
}

function drawStars(p, top, bottom) {
  p.stroke(0);
  p.strokeWeight(1);

  for (let i = 0; i < 55; i++) {
    const x = p.random(12, p.width - 12);
    const y = p.random(top + 10, bottom);

    if (p.random() > 0.82) {
      p.strokeWeight(1.5);

      p.line(
        x - 3,
        y,
        x + 3,
        y
      );

      p.line(
        x,
        y - 3,
        x,
        y + 3
      );

      p.strokeWeight(1);
    } else {
      p.point(x, y);
    }
  }
}

function drawMoon(p, x, y) {
  p.noStroke();

  p.fill(0);
  p.circle(x, y, 72);

  p.fill(255);
  p.circle(
    x + 21,
    y - 7,
    64
  );
}

function drawBackCity(p, bottom) {
  let x = -5;

  while (x < p.width) {
    const bw = p.random(15, 28);
    const bh = p.random(80, 175);
    const y = bottom - bh;

    p.noStroke();
    p.fill(180);

    p.rect(
      x,
      y,
      bw,
      bh
    );

    p.fill(255);

    for (
      let wy = y + 10;
      wy < bottom - 8;
      wy += 13
    ) {
      for (
        let wx = x + 5;
        wx < x + bw - 4;
        wx += 8
      ) {
        if (p.random() > 0.55) {
          p.rect(
            wx,
            wy,
            2,
            4
          );
        }
      }
    }

    if (p.random() > 0.55) {
      p.stroke(0);
      p.strokeWeight(1);

      p.line(
        x + bw / 2,
        y,
        x + bw / 2,
        y - p.random(10, 30)
      );
    }

    x += bw + p.random(2, 4);
  }
}

function drawMiddleCity(p, bottom) {
  let x = -8;

  while (x < p.width) {
    const bw = p.random(25, 45);
    const bh = p.random(120, 255);
    const y = bottom - bh;

    p.noStroke();
    p.fill(0);

    p.rect(
      x,
      y,
      bw,
      bh
    );

    drawWindows(
      p,
      x,
      y,
      bw,
      bh,
      10,
      17,
      4,
      7
    );

    if (p.random() > 0.45) {
      drawAntenna(
        p,
        x + bw / 2,
        y,
        p.random(15, 45)
      );
    }

    x += bw + p.random(3, 7);
  }
}

function drawFrontCity(p, bottom) {
  let x = -15;

  while (x < p.width) {
    const bw = p.random(35, 60);
    const bh = p.random(170, 320);
    const y = bottom - bh;

    p.noStroke();
    p.fill(0);

    p.rect(
      x,
      y,
      bw,
      bh
    );

    if (p.random() > 0.65) {
      p.rect(
        x + bw * 0.2,
        y - 10,
        bw * 0.6,
        10
      );
    }

    drawWindows(
      p,
      x,
      y,
      bw,
      bh,
      11,
      18,
      4,
      7
    );

    if (p.random() > 0.4) {
      drawAntenna(
        p,
        x + bw * p.random(0.3, 0.7),
        y,
        p.random(20, 65)
      );
    }

    if (
      bw > 43 &&
      p.random() > 0.68
    ) {
      drawBuildingSign(
        p,
        x,
        y,
        bw,
        bh
      );
    }

    x += bw + p.random(4, 8);
  }
}

function drawWindows(
  p,
  x,
  y,
  bw,
  bh,
  stepX,
  stepY,
  ww,
  wh
) {
  p.noStroke();
  p.fill(255);

  for (
    let wy = y + 15;
    wy < y + bh - 12;
    wy += stepY
  ) {
    for (
      let wx = x + 7;
      wx < x + bw - 6;
      wx += stepX
    ) {
      if (p.random() > 0.3) {
        p.rect(
          wx,
          wy,
          ww,
          wh
        );
      }
    }
  }
}

function drawAntenna(p, x, y, height) {
  p.stroke(0);
  p.strokeWeight(2);

  p.line(
    x,
    y,
    x,
    y - height
  );

  p.noStroke();
  p.fill(0);

  p.circle(
    x,
    y - height,
    4
  );
}

function drawBuildingSign(
  p,
  x,
  y,
  bw,
  bh
) {
  const labels = [
    "24H",
    "CITY",
    "NITE"
  ];

  const label =
    labels[
      Math.floor(
        p.random(labels.length)
      )
    ];

  const sy =
    y +
    Math.min(
      bh - 50,
      p.random(50, 120)
    );

  p.noStroke();
  p.fill(255);

  p.rect(
    x + 5,
    sy,
    bw - 10,
    22
  );

  p.fill(0);
  p.textAlign(p.CENTER, p.CENTER);
  p.textStyle(p.BOLD);
  p.textSize(7);

  p.text(
    label,
    x + bw / 2,
    sy + 11
  );
}

function drawPowerLines(p, top, bottom) {
  const lx = 45;
  const rx = 205;

  p.stroke(0);
  p.strokeWeight(5);

  p.line(
    lx,
    top + 185,
    lx,
    bottom - 20
  );

  p.line(
    rx,
    top + 235,
    rx,
    bottom - 20
  );

  p.strokeWeight(3);

  p.line(
    lx - 17,
    top + 215,
    lx + 19,
    top + 215
  );

  p.line(
    rx - 18,
    top + 265,
    rx + 18,
    top + 265
  );

  p.noStroke();
  p.fill(0);

  for (let i = 0; i < 4; i++) {
    p.circle(
      lx,
      top + 220 + i * 14,
      5
    );

    p.circle(
      rx,
      top + 270 + i * 14,
      5
    );
  }

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);

  for (let i = 0; i < 4; i++) {
    const yy =
      top + 220 + i * 14;

    p.beginShape();

    for (
      let x = lx;
      x <= rx;
      x += 8
    ) {
      const t =
        (x - lx) /
        (rx - lx);

      const sag =
        p.sin(t * p.PI) * 25;

      p.vertex(
        x,
        yy + sag
      );
    }

    p.endShape();
  }
}

function drawBridge(p, y) {
  p.stroke(255);
  p.strokeWeight(2);

  p.line(
    0,
    y,
    p.width,
    y + 28
  );

  p.line(
    0,
    y + 12,
    p.width,
    y + 40
  );

  p.strokeWeight(1);

  for (
    let x = 10;
    x < p.width;
    x += 28
  ) {
    p.line(
      x,
      y + 3,
      x + 13,
      y + 4
    );
  }

  p.stroke(0);
  p.strokeWeight(4);

  for (
    let x = 35;
    x < p.width;
    x += 80
  ) {
    p.line(
      x,
      y + 35,
      x,
      y + 75
    );
  }

  p.strokeWeight(2);

  for (
    let x = 20;
    x < p.width;
    x += 42
  ) {
    p.line(
      x,
      y - 5,
      x,
      y - 18
    );

    p.circle(
      x,
      y - 20,
      4
    );
  }
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });

  p.drawingContext.drawImage(
    barcodeCanvas,
    Math.floor(centerX - barcodeCanvas.width / 2),
    y
  );
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);

  for (let x = x1; x < x2; x += dash + gap) {
    p.line(
      x,
      y1,
      Math.min(x + dash, x2),
      y2
    );
  }
}