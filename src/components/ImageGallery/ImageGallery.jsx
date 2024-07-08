import ImageCard from "../ImageCard/ImageCard"
import css from "./ImageGallery.module.css"

export default function ImageGallery({images, openModal}) {
    return (
        <ul className={css.container}>
            {images.map((image) => (
                <li className={css.imageWrap} key={image.id}>
                    <ImageCard image={image } openModal={openModal} />
	</li>
            ))}
</ul>

    )
}