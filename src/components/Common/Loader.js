import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Container fluid style={{ height: "100vh", display: 'flex' }} >
            <Row style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Spinner role="status" animation="grow" style={{ backgroundColor: 'teal', }} />
            </Row>

        </Container>

    );
}

export default Loader;