export function ColorService() {"ngInject";
  
  this.list1 = ["#5A9BD4", "#7AC36A", "#F15A60", "#FAA75B", "#9E67AB", "#737373"];
  this.list2 = ["#185AA9", "#008C48", "#EE2E2F", "#F47D23", "#662C91", "#010202"];
  this.list3 = ["#185AA9", "#008C48", "#EE2E2F", "#F47D23", "#662C91", "#010202"];
  
  this.getColor = (color, shade) => {
    return this.ColorLuminance(this.list1[color], 0.1*shade);
  }
  this.getColorLight = (color, shade) => {
    return this.ColorLuminance(this.list2[color], 0.1*shade);
  }
  this.getColorDark = (color, shade) => {
    return this.ColorLuminance(this.list3[color], 0.1*shade);
  }
  
  this.ColorLuminance= (hex, lum) => {

  // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }

    return rgb;
  }
}

