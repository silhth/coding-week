import { q, eraseDivContent} from "./basicFunction.js"
import { filterPriority,  toDoList} from "./script.js"

const input = q('#search');

const searchItem = (container) => {
input.addEventListener('keyup', () => {

    const value = input.value.toLowerCase();

    const results = toDoList.filter((item) =>
     item.title.toLowerCase().search(value) > -1)
    
    eraseDivContent(container)
    filterPriority(results);
});
}

export { searchItem }