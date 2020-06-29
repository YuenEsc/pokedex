const getColorsPerType = type => {
  let color;
  let secondaryColor;
  switch (type) {
    case 'WATER':
      color = '#58A9F4';
      secondaryColor = '#6DC1F9';
      break;
    case 'ICE':
      color = '#9DD5FB';
      secondaryColor = '#B1DEFC';
      break;
    case 'DRAGON':
      color = '#9DD5FB';
      secondaryColor = '#B1DEFC';
      break;
    case 'STEEL':
      color = '#919AA1';
      secondaryColor = '#9CA4AB';
      break;
    case 'FIRE':
      color = '#FC6C6D';
      secondaryColor = '#FA8A7E';
      break;
    case 'FIGHTING':
      color = '#FC6C6D';
      secondaryColor = '#FA8A7E';
      break;
    case 'GRASS':
      color = '#49D0B0';
      secondaryColor = '#67D8C1';
      break;
    case 'ELECTRIC':
      color = '#FDCE4C';
      secondaryColor = '#FFD86F';
      break;
    case 'POISON':
      color = '#7B538B';
      secondaryColor = '#855996';
      break;
    case 'GHOST':
      color = '#7B538B';
      secondaryColor = '#855996';
      break;
    case 'DARK':
      color = '#31363A';
      secondaryColor = '#42484D';
      break;
    case 'BUG':
      color = '#52C1A9';
      secondaryColor = '#66D5BD';
      break;
    case 'GROUND':
      color = '#B0736D';
      secondaryColor = '#C28880';
      break;
    case 'ROCK':
      color = '#B0736D';
      secondaryColor = '#C28880';
      break;
    case 'NORMAL':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    case 'FAIRY':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    case 'PSYCHIC':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    default:
      break;
  }
  return {color: color, secondaryColor: secondaryColor};
};

export default getColorsPerType;
