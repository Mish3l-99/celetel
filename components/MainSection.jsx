import React, { useEffect, Fragment, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import { RiPlayListAddLine } from "react-icons/ri";
import { FiFilter, FiLogOut } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import { CgBell } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { HiMenuAlt2 } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user";
import { closeSideBar, openSideBar } from "../store/sidebar";

import axios from "axios";

const initialForm = {
  name: "",
  bank: "",
  age: "",
  balance: "",
};

const MainSection = () => {
  const [modal, setModal] = useState("none");
  const [listChange, setListChange] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialForm);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isOpen = useSelector((state) => state.sidebar.value);

  // read show
  useEffect(() => {
    getData();
  }, [listChange]);

  const getData = async () => {
    const all = await axios.get(
      "https://celetel-project-default-rtdb.asia-southeast1.firebasedatabase.app/customers.json"
    );
    const customers = [];
    Object.keys(all.data).map((id, i) => {
      customers.push({ id: id, ...all.data[id] });
    });
    setData(customers);
  };

  const changeForm = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  // create
  const addCustomer = (e) => {
    e.preventDefault();
    setListChange(true);
    axios
      .post(
        "https://celetel-project-default-rtdb.asia-southeast1.firebasedatabase.app/customers.json",
        form
      )
      .then((res) => {
        setListChange(false);
        setForm(initialForm);
        setModal("none");
      });
    // added
  };

  // update
  const openEditModal = (e, id) => {
    e.preventDefault();
    setModal(id);
    data.forEach((cus) => {
      if (cus.id === id) {
        setForm({
          name: cus.name,
          bank: cus.bank,
          age: cus.age,
          balance: cus.balance,
        });
      }
    });
  };
  const editCus = (e) => {
    e.preventDefault();
    setListChange(true);
    axios
      .put(
        `https://celetel-project-default-rtdb.asia-southeast1.firebasedatabase.app/customers/${modal}/.json`,
        form
      )
      .then((res) => {
        setListChange(false);
        setForm(initialForm);
        setModal("none");
      });
    // added
  };

  // delete
  const deleteCus = (e, id) => {
    e.preventDefault();
    setListChange(true);
    axios
      .delete(
        `https://celetel-project-default-rtdb.asia-southeast1.firebasedatabase.app/customers/${id}/.json`
      )
      .then((res) => setListChange(false));
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // setListChange(true);
    if (e.target.value === "") {
      setListChange((listChange) => !listChange);
    } else {
      const results = data.filter((cus) =>
        cus.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(results);
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  } else {
    console.log(data);
  }

  return (
    <section className="w-full">
      {/* bar */}
      <div className="w-full flex flex-row gap-x-4 justify-between bg-white py-2 px-3">
        <div className="flex-1 flex gap-x-1 items-center">
          <div className="md:hidden">
            {isOpen ? (
              <span onClick={() => dispatch(closeSideBar())}>
                <ImCancelCircle />
              </span>
            ) : (
              <span onClick={() => dispatch(openSideBar())}>
                <HiMenuAlt2 />
              </span>
            )}
          </div>
          <form className="w-full flex" action="">
            <input
              onChange={(e) => handleSearch(e)}
              className="w-full py-1 px-3 border rounded focus:outline-none focus:border-celetel"
              type="text"
              placeholder="Search Name..."
            />
            <span className="bg-celetel w-8 rounded flex justify-center items-center">
              <GoSearch />
            </span>
          </form>
        </div>

        <div className="flex gap-x-4 items-center">
          <div className="relative">
            <div className="absolute rounded-full h-2 w-2 bg-red-700" />
            <CgBell size={25} />
          </div>
          <div className="">
            <Image
              alt="/"
              className="rounded-lg"
              src="https://i.pravatar.cc/100"
              height={30}
              width={30}
            />
          </div>
        </div>
      </div>
      {/* welcome */}
      {/* <br /> */}
      <div>
        <div className="container flex flex-col md:flex-row md:justify-between">
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome, {user.email}
          </h1>
          <button
            onClick={() => dispatch(logout())}
            className="w-fit bg-gray-400 flex gap-x-2 items-center px-3 rounded-md hover:bg-gray-500"
          >
            Logout
            <span>
              <FiLogOut />
            </span>
          </button>
        </div>
      </div>
      {/* table */}
      <div id="table" className="">
        <div className="container">
          <div>
            <h6 className="text-xl md:text-2xl">Info :</h6>
            <br />
          </div>
          <div className="">
            {/* buttons */}
            <div className="flex justify-end gap-x-3 mb-2">
              <button className="px-4 py-[2px] border border-celetel text-celetel rounded-md text-[18px] flex items-center gap-x-1 hover:bg-celetel hover:text-white transition-colors ease-in duration-200">
                <span>
                  <FiFilter />
                </span>
                Filter
              </button>
              <button
                onClick={() => setModal("add")}
                className="px-4 py-[2px] bg-green-600 text-white rounded-md text-[18px] flex items-center gap-x-1 hover:text-green-600 hover:bg-white transition-colors ease-in duration-200"
              >
                <span>
                  <RiPlayListAddLine />
                </span>
                Add
              </button>
            </div>
            {/* actual table */}
            <table className="w-full table-auto">
              <thead className="bg-white text-left">
                <tr className="">
                  <th>Name</th>
                  <th>Bank</th>
                  <th>Age</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((customer, i) => (
                    <tr key={i}>
                      <td>{customer.name}</td>
                      <td>{customer.bank}</td>
                      <td>{customer.age}</td>
                      <td>{customer.balance}</td>
                      <td className="flex gap-x-1 items-center">
                        <button
                          onClick={(e) => openEditModal(e, customer.id)}
                          className="text-celetel"
                        >
                          <AiOutlineEdit />
                        </button>
                        <button
                          onClick={(e) => deleteCus(e, customer.id)}
                          className="text-red-700"
                        >
                          <CgTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* add modal */}
      <Transition appear show={modal !== "none"} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModal("none");
            setForm(initialForm);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-fit justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Customer
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="flex flex-col w-full" action="">
                      <input
                        name="name"
                        onChange={(e) => changeForm(e)}
                        value={form.name}
                        className="px-2 py-1 border my-1"
                        type="text"
                        placeholder="Name..."
                      />
                      <input
                        name="bank"
                        onChange={(e) => changeForm(e)}
                        value={form.bank}
                        className="px-2 py-1 border my-1"
                        type="text"
                        placeholder="Bank..."
                      />
                      <input
                        name="age"
                        onChange={(e) => changeForm(e)}
                        value={form.age}
                        className="px-2 py-1 border my-1"
                        type="number"
                        placeholder="Age..."
                      />
                      <input
                        name="balance"
                        onChange={(e) => changeForm(e)}
                        value={form.balance}
                        className="px-2 py-1 border my-1"
                        type="number"
                        placeholder="Balance..."
                      />
                      <hr />
                      {modal === "add" ? (
                        <button
                          onClick={(e) => addCustomer(e)}
                          className="mt-4 float-left w-fit text-center px-4 py-[2px] bg-green-600 text-white rounded-md text-[18px] flex items-center gap-x-1 hover:text-green-600 hover:bg-white transition-colors ease-in duration-200"
                        >
                          <span>
                            <RiPlayListAddLine />
                          </span>
                          Add
                        </button>
                      ) : (
                        <button
                          onClick={(e) => editCus(e)}
                          className="mt-4 float-left w-fit text-center px-4 py-[2px] bg-celetel text-white rounded-md text-[18px] flex items-center gap-x-1 hover:text-green-600 hover:bg-white transition-colors ease-in duration-200"
                        >
                          <span>
                            <AiOutlineEdit />
                          </span>
                          Edit
                        </button>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default MainSection;
