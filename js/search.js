import { q, eraseDivContent} from "./basicFunction.js"
import { filterPriority} from "./script.js"

const input = q('#search');

const searchItem = (arr, container) => {
input.addEventListener('keyup', () => {

    const value = input.value.toLowerCase();

    const results = arr.filter((item) =>
     item.title.toLowerCase().search(value) > -1)
    
    eraseDivContent(container)
    console.log(arr)
    filterPriority(results);
});
}

export { searchItem }