import { ThreeDots } from "react-loader-spinner";
import css from "./loader.module.css"


export default function Loader() {
    return (
        <div className={css.loader}>
            <ThreeDots color="#00BFFF" height={80} width={80}/>
        </div>
    )
}