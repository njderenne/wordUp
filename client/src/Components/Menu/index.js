import React, { useState, createRef, useEffect } from "react";
import Popper from "popper.js";
import AddChat from "../AddChat";
import DeleteChat from "../DeleteChat";
import AddFriend from "../SearchFriend";



import { useQuery, useSubscription } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CHANNEL, GET_USER, TOGGLE_CHAT } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth'
import { CHANNEL_SUBSCRIPTION } from '../../utils/subscriptions';




function Menu() {

    //Data pulled for populating add side bar data

    const [state, dispatch] = useStoreContext();

    const {currentChat} = state;

    const { loading, data: queryData } = useQuery(QUERY_USER);

    const userData = Auth.getProfile();

    const { data } = useSubscription(CHANNEL_SUBSCRIPTION, {
        variables: {
            userId: userData.data._id
        }
    })

    useEffect(() => {
        if (queryData) {
            dispatch({
                type: UPDATE_CHANNEL,
                channels: queryData.user.channels
            });
            queryData.user.channels.forEach((channel) => {
                idbPromise('channels', 'put', channel);
            });
            dispatch({
                type: GET_USER,
                firstName: queryData.user.firstName,
                lastName: queryData.user.lastName
            });
        } else if (!loading) {
            idbPromise('channels', 'get').then((channels) => {
                dispatch({
                    type: UPDATE_CHANNEL,
                    channels: channels
                });
            });
        }
    }, [queryData, loading, dispatch]);

    // subscription useEffect
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_CHANNEL,
                channels: data.channelAdded.channels
            });
            data.channelAdded.channels.forEach((channel) => {
                idbPromise('channels', 'put', channel)
            });
        }
    }, [data, dispatch]);


    function selectChat(id) {
        dispatch({ type: TOGGLE_CHAT, currentChat: id });
        return id;
    }


  // dropdown props for the dropdown menu
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div className="col-span-3 col-start-1 col-end-5 fixed bg-gray-light w-screen grid-cols-4">
        <div className="col-start-3 w-full sm:w-9/12 md:w-4/12 px-4">
          <div className="">
            <button className={"text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 col-start-3 col-end-4 col-span-1"}
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              Menu
            </button>
            {/* Drop down menu start */}
            <div
              ref={popoverDropdownRef}
              className={(dropdownPopoverShow ? "block " : "hidden ") + "bg-gray-light text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-max pb-0"
              }
              style={{ minWidth: "18rem" }}
            >

                {/* Beginning of all the data to populate the sections */}
                <AddChat />
                <AddFriend />
                <DeleteChat />

                <div className="grid mx-auto justify-center grid-flow-row">
                {state.channels.map(channel => (
                <div key={channel._id}>
                    {currentChat === channel._id ?
                    (
                        <div onClick={() => {selectChat(channel._id)}} key={channel._id} className="bg-purple cursor-pointer flex border border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                            <p className="text-md font-bold text-gray-darkest" >{channel.name}</p>
                        </div>
                    ) : (
                        <div onClick={() => {selectChat(channel._id)}} key={channel._id} className="flex border cursor-pointer  border-transparent hover:border-gray-lightest hover:bg-purple-dark rounded-md my-1">
                            <p className="text-md font-bold text-gray-darkest" >{channel.name}</p>
                        </div>
                    )}
                </div>
            ))}
            </div>
            <div>
            </div>
            <div className="w-full border-t-4 border-black bg-gray p-4 grid grid-cols-2">
                <div className="col-auto">
                    <p className="pl-8 text-lg font-bold text-gray-darkest">{state.firstName} {state.lastName}</p>
                    <a href="/" onClick={() => Auth.logout()} className="pl-8 text-lg font-bold text-gray-darkest rounded-md border border-transparent hover:border-gray-lightest hover:bg-purple">Logout</a>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;