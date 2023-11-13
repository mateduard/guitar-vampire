import './mainbody.styles.scss';


const MainBody = ({children, carousel}) => {

    return(
        <>
        <main className="main-container">
            {carousel ? carousel : ''}
            <div className="main-content">
                {children}
            </div>
        </main>
        </>
    )
}

export default MainBody;