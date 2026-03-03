import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../index.css";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.style.WebkitTextSecurity = 'disc';
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.style.WebkitTextSecurity = 'none';
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
      // console.log(form);
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
        // console.log([...passwordArray, {...form,id: uuidv4()}]);
      );
      setForm({ site: "", username: "", password: "" });
      toast("🦄 Password saved successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }else{
      toast("🦄 Please fill all the fields and the length must be more than 3 characters!")
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting Password with id: ", id);
    let confirm = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirm) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("🦄 Password deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing Password with id: ", id);
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    // alert("Copied to clipboard: " + text);
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-2 md:p-0 md:mycontainer md:w-[75%] mx-auto min-h-[84vh]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-sm sm:text-base md:text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 items-center text-black gap-4 sm:gap-6 md:gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full text-black px-3 py-2 text-sm sm:text-base"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 sm:gap-6 md:gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full px-3 py-2 text-sm sm:text-base"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full px-3 py-2 pr-10 text-sm sm:text-base"
                style={{ WebkitTextSecurity: 'disc' }}
                name="password"
                type="text"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[50%] -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 sm:px-8 py-2 w-fit border border-green-900 text-sm sm:text-base"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            <b>Save</b>
          </button>
        </div>
        <div className="passwords px-2">
          <h2 className="font-bold text-xl sm:text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div className="text-sm sm:text-base">No passwords to show!</div>}
          {passwordArray.length != 0 && (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full rounded-lg overflow-hidden mb-10">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="py-2 text-sm md:text-base">S.No</th>
                      <th className="py-2 text-sm md:text-base">Site</th>
                      <th className="py-2 text-sm md:text-base">Username</th>
                      <th className="py-2 text-sm md:text-base">Password</th>
                      <th className="py-2 text-sm md:text-base">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-100">
                    {passwordArray
                      .filter((item) => item && item.site)
                      .map((item, index) => {
                        return (
                          <tr key={item.id || item.site}>
                            <td className="py-3 border border-white text-center text-sm font-semibold">
                              {index + 1}
                            </td>
                            <td className="py-3 border border-white text-left text-sm">
                              <div className="flex items-start gap-2 px-2">
                                <button
                                  onClick={() => {
                                    copyText(item.site);
                                  }}
                                  className="cursor-pointer flex-shrink-0 hover:scale-110 transition-transform mt-0.5"
                                  title="Copy site"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px", display: "block" }}
                                  />
                                </button>
                                <a
                                  href={item.site}
                                  target="_blank"
                                  className="break-all flex-1"
                                >
                                  {item.site}
                                </a>
                              </div>
                            </td>
                            <td className="py-3 border border-white text-left text-sm">
                              <div className="flex items-start gap-2 px-2">
                                <button
                                  onClick={() => {
                                    copyText(item.username);
                                  }}
                                  className="cursor-pointer flex-shrink-0 hover:scale-110 transition-transform mt-0.5"
                                  title="Copy username"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px", display: "block" }}
                                  />
                                </button>
                                <span className="break-all flex-1">{item.username}</span>
                              </div>
                            </td>
                            <td className="py-3 border border-white text-left text-sm">
                              <div className="flex items-start gap-2 px-2">
                                <button
                                  onClick={() => {
                                    copyText(item.password);
                                  }}
                                  className="cursor-pointer flex-shrink-0 hover:scale-110 transition-transform mt-0.5"
                                  title="Copy password"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                    trigger="hover"
                                    style={{ width: "20px", height: "20px", display: "block" }}
                                  />
                                </button>
                                <span className="break-all flex-1">{item.password}</span>
                              </div>
                            </td>
                            <td className="py-3 border border-white text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  className="cursor-pointer hover:scale-110 transition-transform"
                                  onClick={() => {
                                    editPassword(item.id);
                                  }}
                                  title="Edit password"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/exymduqj.json"
                                    trigger="hover"
                                    stroke="bold"
                                    colors="primary:#121331,secondary:#000000"
                                    style={{ width: 22, height: 22, display: "block" }}
                                  ></lord-icon>
                                </button>
                                <button
                                  className="cursor-pointer hover:scale-110 transition-transform"
                                  onClick={() => {
                                    deletePassword(item.id);
                                  }}
                                  title="Delete password"
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                    trigger="hover"
                                    style={{ width: 22, height: 22, display: "block" }}
                                  ></lord-icon>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 mb-10">
                {passwordArray
                  .filter((item) => item && item.site)
                  .map((item, index) => {
                    return (
                      <div key={item.id || item.site} className="bg-green-100 rounded-lg p-4 border border-green-300 relative">
                        {/* Serial Number Badge */}
                        <div className="absolute top-2 right-2 bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        
                        <div className="space-y-3 pr-10">
                          {/* Site */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600 font-semibold mb-1">Site</p>
                              <a
                                href={item.site}
                                target="_blank"
                                className="text-sm break-all text-blue-600"
                              >
                                {item.site}
                              </a>
                            </div>
                            <div
                              onClick={() => {
                                copyText(item.site);
                              }}
                              className="cursor-pointer ml-2 flex-shrink-0"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                          </div>

                          {/* Username */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600 font-semibold mb-1">Username</p>
                              <p className="text-sm break-all">{item.username}</p>
                            </div>
                            <div
                              onClick={() => {
                                copyText(item.username);
                              }}
                              className="cursor-pointer ml-2 flex-shrink-0"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600 font-semibold mb-1">Password</p>
                              <p className="text-sm break-all">{item.password}</p>
                            </div>
                            <div
                              onClick={() => {
                                copyText(item.password);
                              }}
                              className="cursor-pointer ml-2 flex-shrink-0"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-3 pt-2 border-t border-green-300">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#000000"
                                style={{ width: 24, height: 24 }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                trigger="hover"
                                style={{ width: 24, height: 24 }}
                              ></lord-icon>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
