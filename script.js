const fs = require('fs');

const filename = 'input.txt';
const obj = JSON.parse(fs.readFileSync(filename, 'utf8'));

const groupById = (products, colors, sizes) => products.map(product => ({
  ...product,
  color: colors.find(({id}) => Number(id) === Number(product.id))?.value,
  size: sizes.find(({id}) => Number(id) === Number(product.id))?.value,
})).filter(el => (el.color && el.size));

const sumUpDigits = number => `${number}`.split('').
    map((element, index, array) => !(index % 2) ?
        element + array[index + 1] :
        0).
    filter(Boolean).
    map(number => Number(number[0]) + Number(number[1]));

const algorithm = ({products, colors, sizes, selectedFilters}) => {
  const filteredColors = colors.filter(
      color => selectedFilters.colors.includes(color.value));
  const filteredSizes = sizes.filter(
      size => selectedFilters.sizes.includes(size.value));
  const groupedById = groupById(products, filteredColors, filteredSizes);
  const filteredByPrice = groupedById.filter(product => product.price > 200);
  const sortedByPrice = filteredByPrice.sort(
      (a, b) => (a.price > b.price ? 1 : -1));
  const multipliedAndRounded = Math.round(
      sortedByPrice[0].price * sortedByPrice[sortedByPrice.length - 1].price);
  return sumUpDigits(multipliedAndRounded);
};

console.log('RESULT: ', algorithm(obj));
