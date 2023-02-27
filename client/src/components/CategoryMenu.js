import React, {useEffect} from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../utils/actions";


function CategoryMenu() {
    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const {data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
        }
    }, [categoryData, dispatch]);

    const clickHandler = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
        });
        // console.log(id)
    };


    return(
        <div>
            {categories.map((item) => (
                <button
                key={item._id}
                onClick={() => {
                    clickHandler(item._id);
                }}
                >
                {item.categoryName}
                </button>
            ))}
        </div>
    );
};

export default CategoryMenu;