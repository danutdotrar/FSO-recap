interface ContentPart {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: ContentPart[];
}

const Content = (props: ContentProps) => {
    return (
        <>
            {props.courseParts.map((item) => (
                <p>
                    {item.name} {item.exerciseCount}
                </p>
            ))}
        </>
    );
};

export default Content;
