const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto",{});

const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo("localhost:3000",grpc.credentials.createInsecure())

const text = process.argv[2];

client.createTodo({
    "id":-1,
    "text":text
},(err,response)=>{
    console.log(err)
    console.log("Response from server",JSON.stringify(response));
})


client.readTodos({},(err,response)=>{
    console.log("Received from server",JSON.stringify(response));
})

const call = client.readTodosStream()

call.on("data",(item)=>{
    console.log("Received stream from server", item);
})

call.on("end",e=>{
    console.log("Server Done!");
})