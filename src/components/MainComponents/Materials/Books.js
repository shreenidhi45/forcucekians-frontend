import React, { useState, useEffect } from "react"
import "./Materials.css"
import PopupMessage from "../../CommonToAll/popupMessage/popupMessage";

export default function Books({ setLoading }) {
    const [booksLink, setBooksLink] = useState(null)
    const [errorMessage, setErrorMessage] = useState("");

    // const useEffectCleanUp = new AbortController();
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(window.$SERVER_URI + "/books"
                // { signal: useEffectCleanUp.signal }
            );
            const jsonData = await response.json();
            const respData = jsonData.data;
            if (response.status !== 201 && response.status !== 200) {
                setLoading(false)
                setErrorMessage(jsonData.message);
            } else {
                setLoading(false);
                setBooksLink(
                    respData.map(listItem =>
                        <a className="aStyle"
                            title={listItem.author}
                            key={listItem._id}
                            href={listItem.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer" >
                            {listItem.name}
                        </a>
                    )
                )
            }
        }
        catch (error) {
            setLoading(false);
            console.log(error, "error at material/books.js")
            setErrorMessage("Check Your Network connection & try again !");
        }
    }

    useEffect(() => {
        fetchData();
        //apply unmouting properly by commenting out these below lines.
        // if (useEffectCleanUp) {
        //     return useEffectCleanUp.abort();
        // }
    }, [])

    return (
        <div>
            <PopupMessage
                blankMessage={errorMessage.length ? false : true}
                errorMessage={true}
            >
                {errorMessage}
            </PopupMessage>
            {booksLink}
        </div>
    )

}