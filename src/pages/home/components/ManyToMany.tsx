import ManyToManyRestaurant from "./ManyToManyRestaurant"
import ManyToManyTag from "./ManyToManyTags"
const ManyToMany = () => {
    return (
        <>
            <ManyToManyRestaurant />
            <ManyToManyTag />
            <h4 style={{ textAlign: "justify", margin: "2rem", lineHeight: "30px" }}>
                In the given database schema, there exists a many-to-many relationship between the "Restaurant" and "Tags" entities. This means that a restaurant can be associated with multiple tags, and a tag can be associated with multiple restaurants. This relationship allows for a flexible categorization system where multiple tags can be assigned to a restaurant to describe its characteristics or features, such as cuisine type, ambiance, dietary options, or any other relevant attributes. Similarly, a tag can be associated with multiple restaurants, enabling easy grouping or filtering of restaurants based on specific tags. This many-to-many relationship between restaurants and tags offers a versatile way to classify and retrieve information about restaurants based on various criteria.
            </h4>
        </>
    )
}

export default ManyToMany
