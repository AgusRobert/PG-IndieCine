export default function CafecitoBtn({ linkCafecito }) {
    return (
        <div>
            <a
                href={linkCafecito}
                rel='noopener'
                target='_blank'>
              <img srcset='https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_6.png' alt='Invitame un café en cafecito.app' />
            </a>
        </div>
    )
}