import styled from "styled-components";
import { ReactComponent as LoadingSvg } from "../../loading.svg";

const Section = styled.section`
text-align: center;
`

const Loading = () => {
    return (
        <Section>
        <h1>Loading...</h1>
        <LoadingSvg />
        </Section>
    )
}

export default Loading;