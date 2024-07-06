import ImageCard from "../ImageCard/ImageCard"
import css from "./Gallery.module.css"

export default function Gallery({images}) {
    return (
        <ul className={css.container}>
            {images.map((image) => (
                <li className={css.imageWrap} key={image.id}>
                    <ImageCard image={image } />
	</li>
            ))}
</ul>

    )
}