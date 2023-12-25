import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from "../../assets/circles.svg";
const Footer = () => {
  return (
    <MDBFooter color="unique-color-dark" className="font-medium pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="4" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <img src={logo} alt="Book Store App" height="40px" />
              <strong>BoOKSBOoks</strong>
            </h6>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
        </MDBRow>
        <hr />
      </MDBContainer>
    </MDBFooter>
  );
};
export default Footer;