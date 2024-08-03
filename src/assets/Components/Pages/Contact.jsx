import { Container } from "react-bootstrap"
export default function Contact(){
    
    return (
        <>
        <Container>
        <div className="contact">
        <p>For booking related queries/issues, kindly call our 24 hours concierge at 9876543210 or mail to us at forks@mail.com</p>
        <div className="contact2">
            <p>Name of the Company : <strong>The Fork</strong></p>
            <p>Email Address : <strong>forks@mail.com</strong></p>
            <p>Phone Number : <strong>+91 9876543210</strong></p>
            <p>Office Address :</p>
            <div className="contact3">
                <strong>
                <p>48A </p>
                <p>CGA Complex</p>
                <p>4 th Floor</p>
                <p>Mumbai</p>
                </strong>
            </div>
        </div>
        </div>
        </Container>
        </>
    )
}