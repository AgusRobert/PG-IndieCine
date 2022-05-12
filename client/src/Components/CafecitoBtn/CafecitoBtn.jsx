export default function CafecitoBtn({ linkCafecito }) {
    return (
        <div>
            <a
                href={linkCafecito}
                rel='noopener'
                target='_blank'>
                <img
                    srcset='https://cdn.cafecito.app/imgs/buttons/button_3.png 1x, https://cdn.cafecito.app/imgs/buttons/button_3_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_3_3.75x.png 3.75x'
                    src='https://cdn.cafecito.app/imgs/buttons/button_3.png'
                    alt='Invitame un café en cafecito.app'
                />
            </a>
        </div>
    )
}