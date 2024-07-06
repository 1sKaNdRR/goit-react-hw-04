import css from "./ImageCard.module.css"
export default function ImageCard({image}) {
    return (
        <>
<img className={css.photo} src={image.urls.small} alt={image.alt_description} />
</>

    )
}