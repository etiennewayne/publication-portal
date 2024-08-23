import{r as s,R as U,j as e,Y as z,a as n}from"./app-B_mFRvJE.js";import{A as L}from"./AuthenticatedLayout-CdDMuq1s.js";import{F as l,R as G,I as S}from"./index-BQo1PTkC.js";import{s as H,M as v,C as K}from"./index-cqHvwMkD.js";import{F as N,S as V,R as q,P as J,a as Q}from"./Table-B-thMrVn.js";import{B as f}from"./button-DCeV_hfy.js";import{R as W}from"./useForceUpdate-Ds-AvRjX.js";import"./ApplicationLogo-B1Ul7giX.js";import"./transition-Be---51y.js";import"./index-C7ePuH_M.js";const{Column:d}=N,{Search:X}=S;function de({auth:w}){const[i]=l.useForm(),[I,R]=s.useState([]),[h,u]=s.useState(!1),[b,k]=s.useState(0),[F,r]=s.useState(!1);U.useState(!1);const[y,P]=s.useState(5),[j,T]=s.useState(1),[A,Z]=s.useState(""),[m,g]=s.useState({}),[x,C]=s.useState(0),c=async()=>{u(!0);const t=[`search=${document.getElementById("search").value}`,`perpage=${y}`,`page=${j}`].join("&");try{const o=await n.get(`/admin/get-categories?${t}`);R(o.data.data),k(o.data.total),u(!1)}catch(o){u(!1),console.log(o)}};s.useEffect(()=>{c()},[y,A,j]);const E=(a,t)=>{T(a),P(t)},[O,$]=H.useNotification(),p=(a,t,o)=>{O.info({message:t,description:o,placement:a})},_=async a=>{try{const t=await n.get(`/admin/categories/${a}`);i.setFields([{name:"category",value:t.data.category},{name:"active",value:!!t.data.active}])}catch(t){console.log(t)}},D=()=>{C(0),r(!0)},B=a=>{g({}),C(a),r(!0),_(a)},M=async a=>{(await n.delete("/admin/categories/"+a)).data.status==="deleted"&&(p("bottomRight","Deleted!","Category successfully deleted."),c())},Y=async a=>{if(console.log(x),x>0)try{(await n.put("/admin/categories/"+x,a)).data.status==="updated"&&(p("bottomRight","Updated!","Category successfully update."),i.resetFields(),r(!1),c())}catch(t){t.response.status===422&&g(t.response.data.errors)}else try{(await n.post("/admin/categories",a)).data.status==="saved"&&(p("bottomRight","Saved!","Category successfully save."),i.resetFields(),r(!1),c())}catch(t){t.response.status===422&&g(t.response.data.errors)}};return e.jsxs(L,{user:w.user,children:[e.jsx(z,{title:"Category Management"}),$,e.jsx("div",{className:"flex mt-10 justify-center items-center",children:e.jsxs("div",{className:`p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md\r
					sm:w-[740px]`,children:[e.jsx("div",{className:"font-bold mb-4",children:"List of Category"}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2",children:e.jsx(X,{placeholder:"Search...",enterButton:"Search",size:"large",id:"search",loading:h,onSearch:c})}),e.jsxs(N,{dataSource:I,loading:h,rowKey:a=>a.category_id,pagination:!1,children:[e.jsx(d,{title:"Id",dataIndex:"category_id"}),e.jsx(d,{title:"Category",dataIndex:"category"},"category"),e.jsx(d,{title:"Active",dataIndex:"active",render:a=>a?e.jsx("span",{className:"bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full",children:"YES"}):e.jsx("span",{className:"bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full",children:"NO"})},"active"),e.jsx(d,{title:"Action",render:(a,t)=>e.jsxs(V,{size:"small",children:[e.jsx(f,{shape:"circle",icon:e.jsx(q,{}),onClick:()=>B(t.category_id)}),e.jsx(f,{danger:!0,shape:"circle",onClick:()=>v.confirm({title:"Delete?",icon:e.jsx(G,{}),content:"Are you sure you want to delete this data?",okText:"Yes",cancelText:"No",onOk(){M(t.category_id)}}),icon:e.jsx(W,{})})]})},"action")]}),e.jsx(J,{className:"mt-4",onChange:E,defaultCurrent:1,total:b}),e.jsx("div",{className:"flex flex-end mt-2",children:e.jsx(f,{className:"ml-auto",icon:e.jsx(Q,{}),type:"primary",onClick:D,children:"New"})})]})]})}),e.jsxs(v,{open:F,title:"CATEGORY INFORMATION",okText:"Save",cancelText:"Cancel",okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>r(!1),destroyOnClose:!0,modalRender:a=>e.jsx(l,{layout:"vertical",form:i,name:"form_in_modal",autoComplete:"off",initialValues:{category:"",active:!0},clearOnDestroy:!0,onFinish:t=>Y(t),children:a}),children:[e.jsx(l.Item,{name:"category",label:"Category",validateStatus:m.category?"error":"",help:m.category?m.category[0]:"",children:e.jsx(S,{placeholder:"Category"})}),e.jsx(l.Item,{name:"active",valuePropName:"checked",children:e.jsx(K,{children:"Active"})})]})]})}export{de as default};
