"use client";
import { useCallback, useRef } from "react";
import { useUser } from "@/components/common/userContext";
import { logout } from "@/components/common/fetchData";
import { useRouter } from "next/navigation";
import { getMyFavoriteList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";
import { useState, useEffect } from "react";
import Pager from "@/components/common/Pager";
import { getLabels } from "@/components/common/fetchData";
import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import Menu from "@/components/common/Menu";

export default function Mypage() {
  const { user, storeUser } = useUser();
  const router = useRouter();
  const [myFavourites, setMyFavourites] = useState([]);
  const [myFavouritesPageInfo, setMyFavouritesPageInfo] = useState([]);
  const contentDirectory = getLabels();
  const content = contentDirectory.mypage;

  const favoriteList = useCallback(async () => {
    try {
      const favorites = await getMyFavoriteList();
      setMyFavourites(favorites.list);
      setMyFavouritesPageInfo(favorites.pageInfo);
    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  }, []);

  useEffect(() => {
    favoriteList();
  }, [favoriteList]);

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            <section className="c-favoriteList l-container--contents">
              <h2 className="c-heading--lv1">お気に入り記事</h2>
              <p className="c-heading--sub">Favorite articles</p>
              <div className="u-mt-40">
                <CardList data={myFavourites} />
                {/* <Pager pageInfo={myFavouritesPageInfo} /> */}
              </div>
            </section>
          </div>
        </div>
        <div className="l-container--col-2__side">
          <Menu />
        </div>
      </div>
    </div>
  );
}
