import css from "./ImageCard.module.css"
export default function ImageCard({image, openModal}) {
    return (
        <>
            <img
                className={css.photo}
                src={image.urls.small}
                alt={image.alt_description}
                onClick={() => openModal(image.urls.full)}
            />
</>

    )
}