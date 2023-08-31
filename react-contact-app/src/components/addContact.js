import {useForm} from "react-hook-form"
import { addContacts } from "../services/services";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
    let navigate=useNavigate()
    const {register,handleSubmit,formState:{errors},}=useForm()
    const SubmitData=(data)=>{
        console.log(data);
        addContacts(data).then(res=>{
            if(res.status===201){
                alert("contact added successfully")
                navigate('/')
            }
        }).catch(err=>{
            alert(err.response.data.error)
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(SubmitData)}>
                <div class="form-group">
                    <label for="firstName">FirstName</label>
                    <input id="firstName"  type="text" {...register("firstName",{required:"This field is required",minLength:{value:3,message:"minimum length should be 3."}})} />
                   {errors.firstName && <span color="red">{errors.firstName.message}</span>}
                </div>
                <div class="form-group">
                    <label for="lastName">LastName</label>
                    <input id="lastName"  type="text" {...register("lastName",{required:"This field is required",minLength:{value:3,message:"minimum length should be 3."}})} />
                    {errors.lastName && <span color="red">{errors.lastName.message}</span>}
                </div>

                <div class="form-group">
                    <label for="gender ">Gender</label>
                    <select  id="gender" {...register("gender",{required:"This field is required"})}>
                        <option selected value="MALE">Male</option>
                        <option value="FEMALE" >Female</option>
                        <option value="OTHERS" >Others</option>
                    </select>
                    {errors.gender && <span color="red">{errors.gender.message}</span>}
                </div>

                <div class="form-group">
                    <label for="line1">Address Line1</label>
                    <input id="line1"  type="text" {...register("address.line1",{required:"This field is required",minLength:{value:8,message:"minimum length should be 8."}})} />
                    {errors.address?.line1 && <span color="red">{errors.address.line1.message}</span>}
                </div>
                <div class="form-group">
                    <label for="line2">Address Line2</label>
                    <input id="line2"  type="text" {...register("address.line2")}/>
                </div>
                <div class="form-group">
                    <label for="city">Address City</label>
                    <input id="city"  type="text" {...register("address.city",{required:"This field is required"})}/>
                    {errors.adddress?.city && <span color="red">{errors.adddress.city.message}</span>}
                </div>
                <div class="form-group">
                    <label for="country">Address Country</label>
                    <input id="country"  type="text" {...register("address.country",{required:"This field is required"})}/>
                    {errors.address?.country && <span color="red">{errors.address.country.message}</span>}
                </div>
                <div class="form-group">
                    <label for="zipcode">Address Zipcode</label>
                    <input id="zipcode"  type="text" {...register("address.zipCode",{required:"This field is required",maxLength:{value:10,message:"maximum length should be 10."}})}/>
                    {errors.address?.zipCode && <span color="red">{errors.address.zipCode.message}</span>}
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email"  type="email" {...register("email",{required:"This field is required"})} />
                    {errors.email && <span color="red">{errors.email.message}</span>}
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input id="phone"  type="text" {...register("phone",{required:"This field is required",maxLength:{value:10,message:"maximum length should be 10."},pattern:{value:/^[0-9]+$/,message:"Invalid value."}})}/>
                    {errors.phone && <span color="red">{errors.phone.message}</span>}
                </div>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form >
        </>
    )
}

export default AddContact;