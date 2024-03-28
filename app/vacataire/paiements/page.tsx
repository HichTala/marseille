import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import styles from "@/app/ui/home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import './paiment.css'

export default async function Page() {

    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    return (
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-white">
                    {vacataire?.at(0)['nom']} {vacataire?.at(0)['prenom']}
                </div>

                <div className="flex flex-1 items-center">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex mr-0 ml-auto">
                        <li className="px-2"><a href="/vacataire/offres">OFFRES</a></li>
                        <li className="px-2"><a href="/vacataire/propositions">PROPOSITION</a></li>
                        <li className="px-2"><a href="/vacataire/missions">MISSIONS</a></li>
                        <li className="px-2 text-white"><a href="">PAIEMENTS</a></li>
                        <li className="px-2"><a href="">NOTES</a></li>
                    </ul>
                </div>
            </nav>

            <div className="flex w-full p-12 justify-center items-center">
                <div className="main-container w-screen items-center">
                    <div className="year-stats m-auto items-center">
                        <div className="month-group">
                            <div className="bar h-100"></div>
                            <p className="month">Jan</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-50"></div>
                            <p className="month">Fev</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-75"></div>
                            <p className="month">Mar</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-25"></div>
                            <p className="month">Avr</p>
                        </div>
                        <div className="month-group selected">
                            <div className="bar h-100"></div>
                            <p className="month">Mai</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-50"></div>
                            <p className="month">Jui</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-75"></div>
                            <p className="month">Jui</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-25"></div>
                            <p className="month">Aou</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-50"></div>
                            <p className="month">Sep</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-75"></div>
                            <p className="month">Oct</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-25"></div>
                            <p className="month">Nov</p>
                        </div>
                        <div className="month-group">
                            <div className="bar h-100"></div>
                            <p className="month">Dec</p>
                        </div>
                    </div>

                    <div className="flex stats-info">
                        <div className="graph-container">
                            <div className="percent">
                                <svg viewBox="0 0 36 36" className="circular-chart">
                                    <path className="circle" stroke-dasharray="100, 100" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path className="circle" stroke-dasharray="85, 100" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path className="circle" stroke-dasharray="60, 100" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path className="circle" stroke-dasharray="30, 100" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                </svg>
                            </div>
                            <p>Total annuel: 9587 €</p>
                        </div>

                        <div className="info">
                            <p>Piscine la plus rémunératrice <br/><span>Piscine machin bidule</span></p>
                            <p>Revenue du mois en cours <br/><span>3651 €</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}