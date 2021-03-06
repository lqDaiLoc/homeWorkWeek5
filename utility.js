import React from 'react';


const getWeatherBackgroundImage = main => {
    switch (main) {
      case "Thunderstorm":
        return "https://s4827.pcdn.co/wp-content/uploads/2014/06/Great-Thunderstorm-In-City.jpg";
      case "Drizzle":
        return "https://wallpapercave.com/wp/wp2967431.jpg";
      case "Rain":
        return "http://mybestphonewallpapers.com/download/blue-rain-6651.jpg";
      case "Snow":
        return "http://www.123mobilewallpapers.com/wp-content/uploads/2014/06/snow_way_wallpaper.jpg";
      case "Atmosphere":
        return "https://i.pinimg.com/originals/fe/a4/13/fea4139613ef14a56a13eef545284a58.jpg";
      case "Clouds":
        return "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
      case "Clear":
        return "http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Sky/Sky%20iPhone%206%20Plus%20Wallpaper%2037.jpg";
      default:
        return "https://i.pinimg.com/736x/49/43/da/4943da7fd8edd6af16500b2d957dbc9a.jpg";
    }
  }
  const getWeatherIcon = main => {
    switch (main) {
      case "Clear":
        return "weather-sunny";
      case "Clouds":
        return "weather-cloudy";
      case "Drizzle":
      case "shower drizzle":
        return "weather-rainy";
      case "Rain":
        return "weather-pouring";
      case "Thunderstorm":
        return "weather-lightning";
      case "Snow":
        return "weather-snowy";
      default:
        return "vanish";
    }
  };
  
  export {
      getWeatherBackgroundImage,
      getWeatherIcon,
  }