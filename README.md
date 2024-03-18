# Bar Chart
## Overview

Bar Chart build dinamically with JavaScript D3 library and fetched JSON data!<br><br>
<img src="https://github.com/Maruku98/Bar-Chart/assets/133391272/a567c49f-dd11-49ed-bcea-f18e73a651b6" width="500">

## TECHNOLOGIES
- **HTML5**
- **CSS3**
- **JavaScript ES6**
- Async/await
- JSON (plain text)
- **D3 Library** 📚:

### EXPLANATION
- Data is fetched with `async-await` syntax from a GitHub raw file. It is then parsed as JSON and stored in the variable `fetchedData`.
- This data represents United States GDP (Gross Domestic Product) from years 1753 to 2016.
- From here, D3 reads the fetched data and maps `rect` elements into the `svg` container.
- Time scales (`d3.scaleTime()`) and linear scales (`d3.scaleLinear()`) are used to determine `rect` elements' `x` and `y` positions accordingly.
- `d3.min()` and `d3.max()` are used to find the minimum and maximum values within the fetched data.
- A `tooltip` appears with further information as the user hovers over the different `rect` elements.
