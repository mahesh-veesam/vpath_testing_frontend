import React, { useEffect, useState } from 'react'
import { Flex , Button, Input, HStack , Card, Heading ,SimpleGrid, Box , InputGroup } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { IoIosPaper } from "react-icons/io";
import { LuSearch , LuUpload } from "react-icons/lu"
import { useBreakpointValue } from "@chakra-ui/react";
import { axiosInstance } from '@/utils/axios';

const Courses = () => {
    const [data,setData] = useState([])
    const [searchCourse , setSearchCourse] = useState("")
    const variant = useBreakpointValue({ base: "mobile", md: "desktop" });

    let getData = async () =>{
        let res = await axiosInstance.get('courses')
        let cdata = await res.data
        setData(cdata)
        console.log(data)
    }

    useEffect (()=> {
        getData()
    },[])

  return (
    <div>
        <Flex justify="start" mx="5%" my="2%">
            <Box mx="3" w="95%" >
                <Flex justify="space-between" align="center">
                    <InputGroup startElement={<LuSearch />} w="50%">
                        <Input placeholder="Search Course" borderRadius="10px" 
                            value={searchCourse} onChange={(e)=>setSearchCourse(e.target.value)}/>
                    </InputGroup>
                    <Button as={Link} to="upload" pr="20px" mt="0" fontSize="14px" rounded="12px" variant="outline"><LuUpload />
                       {variant === "mobile" ? "Upload" : "Upload Question Paper"} 
                    </Button>
                </Flex>    
            </Box>
        </Flex>
            <SimpleGrid columns={{ base: 1, sm : 2,  md: 3 }} spacing={1} mx="5%" my="2%">
                {data
                .filter((d)=>(
                    d._id.toLowerCase().includes(searchCourse.toLowerCase()) || 
                    d.title.toLowerCase().includes(searchCourse.toLowerCase())
                ))
                .map((d) => (
                    <Card.Root size="sm" m="2" key={d._id} _hover={{bg: "gray.800", color:"white", cursor: "pointer", transform: "scale(1.05)", transition: "all 0.5s",}}>
                        <Link to={`course/${d._id}`}>
                            <Card.Header>
                                <HStack>
                                    <IoIosPaper/>
                                    <Heading size="md">{d._id}</Heading>
                                </HStack>
                            </Card.Header>
                            <Card.Body color="fg.muted">
                                {d.title}
                            </Card.Body>
                        </Link>
                    </Card.Root>
                ))}
            </SimpleGrid>
    </div>
  )
}

export default Courses
