import React, { useEffect, useState } from "react";
import { Button, Pane, Popover, Table, Text } from "evergreen-ui";
import { IQuestionData } from "./interface";
import axios from "axios";

const Questions = () => {
  let pageNO: number = 1;
  const [data, setData] = useState<IQuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageNO);
  useEffect(() => {
    questions();
  }, [page]);
  const questions = async (): Promise<void> => {
    try {
      // let response = await axios.get(
      //   "https://api.stackexchange.com/docs/2.2/questions?order=desc&sort=activity&site=stackoverflow"
      // );
      // let response_data = await response.data;
      // console.log(response_data);

      let response = await axios.get("http://openlibrary.org/search.json", {
        params: { q: "test", page: page },
      });
      let response_data = await response.data.docs;

      let final = response_data.map((item: object) => item);
      setData([...data, ...final]);
      setLoading(!loading);
    } catch (error) {
      alert(error);
      setLoading(!loading);
    }
  };

  window.onscroll = function () {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollHeight / 2 <= scrollTop - clientHeight) {
      setPage(pageNO++);
    }
  };

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Author</Table.TextHeaderCell>
          <Table.TextHeaderCell>Title</Table.TextHeaderCell>
          <Table.TextHeaderCell> Publisher</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {data.map((item: IQuestionData) => (
            <Table.Row key={item.key}>
              <Table.TextCell>
                <Popover
                  content={({ close }) => (
                    <Pane
                      width={400}
                      maxHeight={400}
                      height={window.innerHeight}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Button onClick={close}>Close</Button>
                      <Text>
                        {item.author_name}
                        {"\n"}
                        <a
                          href={"http://openlibrary.org" + item.key}
                          target="_blank"
                          rel="noreferrer"
                        >
                          http://openlibrary.org{item.key}
                        </a>
                      </Text>
                    </Pane>
                  )}
                >
                  <Text>{item.author_name}</Text>
                </Popover>
              </Table.TextCell>
              <Table.TextCell>{item.title}</Table.TextCell>
              <Table.TextCell isNumber>{item.publisher}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Questions;
