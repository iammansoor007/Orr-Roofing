import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import completeData from "../src/data/completeData.json";

// Register Plugin once
gsap.registerPlugin(ScrollTrigger);

// Image mapping using the same images from services
export const imageMap: Record<string, string> = {
  // Project 1 - Roof Replacement
  project1:
    "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop",
  // Project 2 - Emergency Roof Repair
  project2:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzrwFNtwYvEsM8FRjMDZXs5pBIIDi3xKpKWg&s",
  // Project 3 - Siding & Windows
  project3:
    "https://media.istockphoto.com/id/157441498/photo/residential-home-with-vinyl-siding-gable-roof-seamless-gutters-shutters.jpg?s=612x612&w=0&k=20&c=yBcBktRl417aI7_6EbdckOQ-1x53HwhSPCYDbHwl1dY=",
  // Project 4 - Gutter Installation
  project4:
    "data:image/jpeg;base64,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",
  // Project 5 - Deck & Patio
  project5:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFRUXGR4bGBcXFxgdGxgaIBgXGBgYGxodHSggGholGxodITEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYHAQj/xABMEAACAgEDAgQDBQMIBwYEBwABAgMRAAQSIQUxE0FRYQYicQcygZGhFEJSscEVIzNicpLR4fA0Q1NygrLxFiU0RGMmVGOTorPC0v/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACgRAAICAgICAQQDAQEAAAAAAAABAhEDIRIxQQQiQlETMmFxI0KRBf/aAAwDAQACEQMRAD8A5K+2u9ulObgV8Px2gBvmdAAWFeVeeFXjZdi8iD5r1tQzWfQ/ELn+StSlf3cO3P/AO63n98jNmTdF0pOzOWP2N7Tqg/PzOL3aZXhUeAq+d2bP2Gt6vC8nxfEoHh6eNf4mZz+SgfeOr4g1jLpYjGx3StuLcFRtB8+ZNaPrlm2Mf5v4X9mH/Ss8lf/ABYf/M0SM68bQhlyPk88bKf+ZxR7/wDUo0/4i+N08KRtO8k7tGrM78WBYHhjXPB4wPVzyOqPM25+SpfgAMAAeQBJxTk2rYKK6A82qmmZRJI7gGgCbq+4+71/XFPPI7RGRmJjFJ7Ld/rkRr1y2j+Vn2yfr2vmdB4s00nxKmyiEjsWeLf8A+Wue3l8J/ew5hQ10mYbaZzXlR4r3zM63q+onHjTzuvKxoCflDuwVVVnyTVXgSfErX7YT/wBwXgvQZndSxdrrS+Zn/NIwH/j5Y5tRScRwTujs+u+KVh2rMyamVmIQRgRsxFkfPZJ+UDzzO9R+INUw3uI4otrFVRAzNQv+9IB/hjN3dTlZJZCCu9yF2rV9iT2A55ycpyl2aRgid/iV4dP4r/AO2zPG+/n/GMWn+INRDH4S/ApZgAtuQWJPNX55mnjU8Hlqvgcm/2cUnXsvij7NBrvjHUybodwRd0dgdwykN/JKQfrg+WZpHbwVYHiuwA/TvnyGOEghv3h5/lz++TYuTbsGox7GfF8k29nVdJ12tlgRZQ6qsUKqtk0Nqn1oUD655qPjCbTeIoklNtE4JkVrULuHPBssBXtlyDqGmhi0n9LhYDDDv5YnyK+Xy5HfAPxUYzrZdmzYY4Gtu1iFd78+PLHHL/7RlLH9Uy2PjOVVhXe+yKTY9E2Sq/r87AE+9YI+LfiKdxF/LDlt7Hw7VWl27SGsIqheQQATeZ/qWoSNmBILrRofMBXk3pzky6GKKfTyblI8dIj/NsfDkLIwFd/7oHfzOaTk2tGahGL2e6eJZpIY/BneNo6Z0S2kbZbUgJO+z2HfLqaaNt3CECzVkHaBXIA/e/XjpOsOZJ5P6QEMTj5P3m3UVsKADVXH15w/oeoMZJpBqIVRgAqM9MFFXcCttzzlY+1sWXoA6iNlYp2ojj5fMEfnkl/TNBl8NnMkYilSq4DcD6HjLvS+iaqdpGXSl1o2zTbRYH3rYHufTB+qjSOdkiYSRGtvqKEAr/lgnr/wBkuP7lTq2sEcbR/KWPz0e1D/5PrgZ3LHkgD0GBZtU0jsxPc18xr92yyHthrOPl+YG/P3rDj/wXFv6is9q4+n+L/rFhKPSKDTbHcRAoCIq2/vPufTni8s3y3yLkU+hkmad49QGW2AdQpUGydu1voQeLrNPL8NaiKF4gG4ZCEUAcAADz/AD4zPJGcXocZJ9mRk1Cx/wB4VW0GieaIrr1q8n0+pjADyo+9aKqCv0I+dgT24HvWAtZ02TRTyiVhLqFTZtSx87VuvsebwpHArxw7qBBGyqu3aX/ALy+Tkg27Afh6aD2ycobpMUlRd6L1mJXWGU7I52B8Q1tPJ2qRdkErQJ4OP8AjnrepmnXQyokIhIZ3UkmRqDIb4+X5vMcgV2sY/+L9PBo9DDFp1HjK2y7s7RZWv3iCbN57p5pOoQDWzNGNQSQitVkJs+2TvI8e0NwrjbQ+uRfxLS8T/ANRqWf8A7H4T/wDpzP8A/wA3/wA2W9H0yZvlWCT6nwyB7EmhjnKXfVzNqWlT+l/MRvfI+YAAtXqB98Z/qmtlllUyybqjWMUAAFXcBwO5tuT65WFOKsqTTdFqTSpEjS+Ism2V41CnsFod/qGzj+IfjKfWPp2EIjOkKiFmNkkMGO8eQO3t33G+MAJqN0aqWpQ1qO7fUc9/rgpdxbyFDuJ/r4r6hP7P1/nGLJJ0VBR/9L/UOuanUSxTNIY5IyGXw/lCsz7iwPcnk8+gGanq3xh1B5o50nKOgC7YwvIqwSzKSRYvyqhwTWTzUalDNCBLFp00QlnbYm2STxgEUspHJG/av1YfUtjQ/Heuj1ulRxp4UMkcrDdEkbK7NFRqiaDY3kYI1F2y8srZzem1k0Zbw2I8RWRgTwVPBHsDfB4yHwmrff9P88K9P6fFqHEbTeF2+ZQrAe9VdZqU+DYjRj10Vc9yrA+lmv0yXmhF02SotmBRNtKfP9BwPzx1nyywv1QdM6eCp1BnmYkNGiMqgGqJdDzfuMLfDj/HdPTwRG9JN8sMrRz6P8A+I7jYh4JFktk1zlfzR0nxO9/onPjnQbGPYIoCteRb9PXEL7kYwzN/lL4Yk1cyy+NDCIRtUSOSzqTfnwORx/Px8tN8ESw/NI8ZTuCjUePTg5v/iD4b0w00k20IxBYndTbuLO8c3x7Vk/S+qaIQ6aPVPC66lXCl/jd6O1XAjHYKpFg2pUc9s0lnlBXHsxjiUnvgZfSfAMUscfiyHdIeYwOGO3yFfdH+ODdP8MafTu0RjSSeON7GzcsO1bJZt1L23UPTJn1vVdHrBpH1gkiVmVGH+rXcQDyQD2Pft5k5poejaWAPKdWjrKrdpIwS4FErH+8BYY7q8gDiBOTtUzXilbQHfSdNmMkmlk1EaCNmIeMKq7UssdylgBXLZq/g3pDT9OkRwH3SneHLEba2qOTwOCfcnEfifT6bUxizO86uoC8KXUotk8CzxjNL1uNJQNLCYoypDc2ST33k9uB2HGRKVqhVpMq6zSpp5JND4Q8QaQzmaLdXhAMi0w5+a2I+q45+j/y4kkmljR3ADQurFxGDQvdyB7/yzQdR6tp9RFq40cNqJIVSML33jggMfLgkn/Ws4+dvmvjkcH88Mbm2S0rG9Q0xikZG4Kkg+xHfAMnJy/qd9DJJI4/eIHtZ5/PHMgbkYpSaexOKao9A9Rg7UzFmJ8sJTRKFN9vTHaHTjUyxxBwjOwUMVJrcQOwyeUf1j1A9V0XVTdTl0+mhaeQ7XKrtFJtUEXYA5PbNxqOqaP4e6fFp/Am1jRzSSMhZQqM+34u/p64O+NerSeBIoJ8KaHwwqAqg3yit4P9njkD38szHVtavUo0iDSiWbz38UO4dm+U2QPIgYjWT6i5tK7L/wAVfHr66JY9JpzGGFSSM1F7Q3zRqFq+BZPme2Y/SaOOXxG1MhgEaGQtsLtStsqjmzYyHr/ThpZXjjlV9nBeNtytRIIB9CPzyXoPUpdMvjRRLqGKNHsdgAqPyHINEdzRPlhN3o0x7Vh/o3wzomkUSzzyAAyFwI1AXsF+cE+4Iy/r/huJ42Gl09sGUrJJLfYk2FXgH2JvBfwp1+CcAa2RzqEGxlRRQoUASOw9s2Meu6dtPzNx6eH+nGH4zX9mr6Wv2cYl1MWk3V5bR+pJOPj+CdVLpjqjvEW/cykhj6EE2Pp+fBzqfi/po1umVIpI1dfFoyUVIIC/M4aqNHgAnAM3xIul0cUDtPO0K0g8YKhKkkEgC6uqu+fbE/hYpu3YcfGezlZ+oaUaUaeFIlk3BmmdN7LtU7gSTQBYDjvQPIzJzPyT54f631NNQzNGnhq7liGcOQfTtZ4AA5/ngnQfD+q1m3wIi2/7pPKn8vOufbLhijFWkQpOTBmhgaRwqLbG/wCeV53+FJdKkUyiLU8+P4MhZRf9kC23HnZrywz0/R6PTwyLq9fJplkZqeJNwWgAeGs+hODo+qfD+ljcadZdS53fNPSFQeBuK2OfqMqUZPpjUqLer+I+mGXxRpppG2ECRptpP9kkgcAAcX+mB+vdSj1MsLwqYwkCQ2V3blR52cC92ywR7/lmaXq3Sjcj9LgLOTW2Zwqrz+4eT9cQ63otymLpmi4IFSgtyvN8sDgsk3syX3X7fC5/xZ6Op6U/J/Imi/OQ/8AxwYv+JdMf/Sul/8A1D/+PHf+Ftef/Sul/wD1D/8AHjv/AAtr/wD0tpf/ANQ//Hk8n9h/Bzp+MoY4wiaGMDbyWq7HmCP3R6frjOifFmn1k0EWqgZ6YDar7SgPAVbAXjv2w30j4Mh1GpEepOpFMWDw6UsgJrdwzUwJoj2vNCnwJ0dSVjE6yKaJaV+QOw2lKAvv8AfNYywSTi7T/AHPbKOzJ/Dnw7rZtH/EU6PpI3O2RyCJAVu0FE2VvgjhgfS839K07Q6J50k3iRwCdojMysjUWK/er0/rlM/AvSGj3JJqUK/cCyEKR7grzf+uM0PwhrFYyPqRMHdYgjoDtCgM7j05oCszycLXFpUWvyUuq9f1M0cMYiaLdEryfL84BsEe55N+vGG9f8bTaqKPTvAkMUarHiCSCQrbn2fesntwK4sXg74h+HdVp3DRMupjJ+QoCHUd6IYgM1fhnRzT/xm/p0p00pAkQnZPxwVujY+Vgb8yZJ/2TxmLkmqNcX4yT5Poz3V/jCVGEMSKhRdoYRrJIrDlNpY1QBvnnjMLrIZPMlgNqqPTc/32r0HHbNjP8C6wWkeo0rKDwj/I2wCwTbDc3qe+ZbXaWWF2SRWVgPmBHIPn2/t98vHKV/UhzjJq12C3jVTtDtXYkj19BzX6YpSJbUHyJqjfHcHgg1+mTyj7oHfn6/9BieYbSAxLH9Pp5flWbIyZBqoH8PYTZUEH2v8AP98rQx0q/UE/rkPjFt9FmJPy3yew/MjJpZVjAUEcdz6n1/LyxpB7LGkkuRfy/X0wypoZntHL4zMeSTk2o1uwbV5Y+w/ri2DjsY6kaaJtdq/AQ7z8zN2RByWY/lx5nNDouix6dTEsnxCsNglVi0T2/I2kDv/ALV48L+2kP8ARtEyN8n80V2gFh4i+dz3Iwfq/iKLTp4MkTy0bI3UIa+UUaPcE37YyfRcVb+zN9T6L/AD0iTzq4UcKgYeQRrdiSd1nivPAMZgikMcimYKaK7tuaqSa3EeWbP8A8Rafv/QdQf8Aij//AHZb0/UtDJDuXpsMlA8sVVQaJbc23kD88WxSS+36GZzUrp5FgGgRfFjW6nbyTQ5C9hXGCdZFtI1OojEGoZ0kULIrFo2U7eA4G4g/vc2Dmi+II00sCz6fSrGshdSqygx7gPQHgnkC/TNtDqI9Z0n+U9PCiSx7VkUcKSpKt9FJ3fSxnPO+SLxP7K5MxXWek62Y+J4U27cS5lYEEkCuCaHl2oYQ+FfhOeYnUuEaKPkgHl3JHb/AFe9/wBcM/CnX3neVtVPH4cRJ+Ufdr0JIAHI455wa3xF0xE2LLLdUqkMvP0BIJ+pGOOOknY3NpNGN+IPiBdTM0UKrDApao0A5BPdsyPxBBtCtH98A/Q0T+n6Zqes6LpWqDTJqH00nJZJQ3h17EcA/1DNZ8B9O0fUIm3Q/Mh2+N4jKzChtazRAo8A2c6lNJaMlBvrRwTSM6kEA2DxXmMZsdR8OtptwYJ/wAO77v/AHfzxP0NGb/aP/1D/wCfBzj9l/hL9mSySKRk/wBk/wDIfri0fSiz7JI2s8hVYFj7Aev3j7DGhfg/Zu3a7xR2G6pz+hOHJJaKjjlJ+iqj2P+uP8AFodvy/XPf5b6PGafS9RY/wCzqNKh/wDyNg8k03xt0uFx4fw/qCFPzCXqDMGHoVC9sUskIq2y4+K2tIahB7n/AK49VB8z+eGj8b6Mkj+RNOF9BqGP/tOIPxprOydG0q/Ryf8A3YXlH+Uf3L/Dn9Jf2Dax/NO3kP8AriyNviY/3rP4M3+WLH+U/wBw/iv/AEmn/wCEPTfDvQotPpTDp4hLqNgJjjuT5CzG/MKCSO3FetZzXU/HHVI58v8A+dW3/wB5c6n/AOy/wmP+3N/S0/8A23v+eZvqXw7r9XrHkYgxC7WSoo/LsBx2A/LIm5ya4yqCfHhHk0xfCPxZ1I6tE/nfDLUxErMOOe3P1zUfEmh6hqW1GpaOdmhTbDCiNu4LEvx94sQO/tlPoXw1/Bbyfyp+8GqDbuJv5b3X64J618Uys5hjYpEg2KBwvHeh62KzWEmo1Znlxxk1pGJm6rPJGySD5H+Yp2VjfJ23z9Dkmh+Jp9KKSVZkUfKsqn5b7gG+T7E1liSVXKb1FlgNwNXXlY4bF8/y3xkmmDzKjE8n5qJ5Hc19MpukSodmf6tqfGneQfdbhffyB/MjngcZRHJPpR/zB/HkfXC3xRpxDqdRFGKSKRgv0NgZR0i0F/2j+nH9cV3EaVSA2uUqwJ8+fzOX9Jp7Cn1Wx+eI0UEnzA/Fd8Zp9QFOxiQD90+h9Pzxu6OZVaYc1ckGhVYtVp/Hk3NHbDZVbyPnZ7ZRZP3j+DVhU6N4HKaTcuuK7pL3r2Iqq/pu8sSdtx9x/Uj9cdfonKS/BkNM6/ypS/uO4J+jfmMOa7qGm0+l1YlILTRyKFWpSWY+Ey/KCBXzjz8qG4Yv8AwdqD1XUBZgJt0ls4UKSsg3E1yD3xkHw+2u6hLEzgwRzFjIAe5PNAgEcj88ydm3KPSA+j/iUfzS6bVSxiQSIhjkH7pW74/pDjOq/DnXYp4U8aVYp2B/PkOWYHduosQSV5PIqjzeTfD3wfpwCpkSJQzIBHtLbSbIYkHnnyqvLBPVPh7p5kaOeR2dBRG88MDwGAXc/1FZUsqdKjOEW+0UeufB2j1kZZdNPA4AqSGwFJPP30qyf1rBh+AYl6U0+l1M+nl2h2bUurqEUhdwVVHv2+uDX+JpdLqW0/SIWg02zwYmmJdtpPJAogbQeG7C8A9T6p1TURvHrGkX5j+8q0u4hdpUKQaFmzxV+uPjJ9NJEzjBHjfAcy6bUyT6hJBCiHdFuTdvcKAC4B83P+tYzU/BUun00upTUmRUCgR6cWzyN+6XYkAADeRRu6rzwS/gbQpFpJfDZtkz/AM9Jo/2QkhdY5D3qgKJPJN3jPif4mnSQwaMCKBWYzOw+fUNuCbFX7pI8h22k+WLjL0x0mqSBnT+iayOJjGixnw/mNySFlBPAHjMikVxyvI/HB/SZdZpYEhghgZUDAEoq2WO5iCBXJ5sntlzU9WY6mTQapjqdPLWwugRhfZdqgDgV2sG7ztOjaTwiFaNAa/wDTxKfzUj9MpY+7M5ZmtGJ+H+ldS6gQ2rkSDSn+8j2F5F/2QtKp+tyH2zWQ/BOgUUmr6kgPYjUy8/8AsyL9M1qxgfQekYZVljjU3zQ8vrj4L7B5Z/ZzvXfD2ug1B/kvqZ1AMiokWpRVmrI5UsiqprzU0a9TnXgBzfdjyN1+4x1Btu4WBa2OD9DkQjBztZPjjr67/UuGSb1yM50z4e6rptRqPF6mJI3d2QNNKWQfchHhOqkAHbVj9cKyaz4mQHaqtXbtMR2z6nP7+j4Z6PHpfA/lPWTyQa+TUTSMPCABp1FhflbkqKOeZ11/UdFpP5UfUyM0EoPhzShbUyMU4oMxJHF3xh+YbX/ZPJ/eH4fqM5c/wD9O+TXp/oPHNp2/wBf+xUet+IZ/wDlwRm/9aUoPf5YsDdU+MupafqAw1tPJ4bBSBGiILB4UHyvG6L4x0kvSYdVuYzSLKjRUCfETdS3f3jXODuqaHqDzS+J04oWYkmZkJJOaZPHjkd/3NH55qMuO7RHLJboG/EHxTr4uoaqKQSttndQN3As3Q4AFAeQHGO6P8X61tZpyzuVeVFYFm+6WAIrPJfhvqMsgjOkJDHzcZQ+JejT6CWJNZGi+IhYbHDig1ea+oON/wBpP/6/9LxZJKdbPStWByGBNeYF/r/AvzGOgU7lqnIPy39RjYhuv8AU1/XHxrtPIJP64/RPzM2jfF7r/A/o34rkkvI/PJ3Qbl/pHj8sXIEAf8Ae98iSIw3/SePyx8J+W/r/wBcTyNquK/9Fxi7sJJq3XkH9RjG6hL5MR+R/wA8rM+eMxxcC22JZJNWUvifUyzaaGWRrYyHk17H/rkHSXJoHzv9a/pi+Jv/ANqg/wDaP/xnG9MIsBfP/wA/8s3xL6GOTsPpE0h2Iu9v3Qp/r+mWtNodUj+K0cqbQQoN/M3Bqv5P8cLdP6hpn0UcSOqThnZ2NgDgAc/Tg+4x/VesM08EwkDKhyoFgX4Mh2jxDVt2sHnM+VE8E3bA88w+Z2+X6mh5/pk2j6XqZttO1j5/wCB/YflkHxVJNNqZJhHIS4BX5W7DgVxRrrGdP1/UADsjlQkC2K8D6nBz+iLWG3s+o/jTQwLHpDDDFGzSuGIULuKptTgD5uXxvwF05U1EziNVVnaIAdyAUYkny3M2V/jKTVyQaM74/C8dwzDYpYhKHy/Nz8wrtmh+AtfqhpA7bZFBO3cvmOzE9j7ZxyyUjRwOo0cNUTS26Bm3cGydtCjVHivL1wR8XfCSyWY9TNCaZ3CpsRKKmjuJJJq/UHtmd1Gv18jSuAjNsaNVjjv5mNqpP0sHnGMNZLoyw3KjFCWkMe9hYEi/LYvl5+2ZrN2Cg9HvR+o9Y0rLpzpW1MXk1UyH6hiGAPp+OdA1fw/1Kdw+lE2i1JUSFkkk+HZCCQfDbfGSAeCj9uK3GcNnXUwSLGsiy/KrMNp+ZWNkDcBfHkc7L8N9U6nqOmGWCFZdVpS0c4LMQSi2LqwSUR/qBz6ZePyP2HLE6tFmU6wQmT/AIrSKoU0+2LbQ55kABGZ7SfGkM+tOkll8Ufdt1Idn8whI+U+fBNm8CfEfVuu9S0zDw/wCUaN2tNAkiI2VtkBq7sAi6rsM+ZtPpZJtWsbP8jOqF2NE/NQHH1oel5ayPoUYL9R2MfE5k1M2lkLpKjgx7SRdjdR9OB2zbdM+M+qRRssqxTpFNErOY2UyozpHIp2sACKYg8dgK4zzrPTtTp3XUSGPYFpyjBiHJ7EA+QHb64uiaiaaWNGRf5zUQjfGXXvNE3mK7KfP1xPJJGvCMkdT+E/iE6yFxRWSM/Mp8mHDEeh4P+OaJMLaHp0ekjEUShFHuSSfUkkk/wBfPJNZrtp2RgDz82WnX3y1yZzSxqzY3iF+mK8qQ6r3w5EEUWpUoXjvM3jxbjkM+mUisrYZB4YwRqsIyv5YH1MnfE2MxPU3NnMGEnBY55MjLHQ6pfnBv6ef0y7p/jfq2id9OuiSZFJDSSncSBVULH6m8AfFqbvFp+fr9DmSEnHkHjuG/3s6nG+TMOXHX2bD/wAadRPT0g8F0nWQfMqAgRkUDuN8lj25F5V+JfiLqE+v0i6qB2eFizhGYRxIADz5Dudx4HpjfgqWSX+SFaWj4k+2mPyr4RrlhxwR+k+k+LdENTrpC6kxQJFCjVwW25l/zs2/8AW/YyT+WUTU6XXQzQpJFIHR1BVgDyP1sY59zLaH/1D+2P+FlB6dolI7aVv1Y4T8LtvH+A/LP1c4i/vFz/xBvpx3+0f8A+f8A+mLH/wAy/wCyH/P/APTH+V/6Dn/Gd71nTNNrLfT/APNl2n1r+uEdDrU1UBngJkjYkEAUeLFgH8r9sVY6AHgWPyxeWZJfYzlsj7V5f1x6YrH5Y9Pvgx5z+WIeWI9v3xcGPkPeI/PGILeh2/rjZF5/TGQny9/0xoUnQyVvy/fGaLmRee1j9Mel1/bCejFaYr/AMm3n/mnHvWX+uU6t8D1HrG9K+L5dLpkjSDcy8FmJo82ODnSdT1bUJ/C9T/PPM2yMxt8pqz+9yau/pkM+v0D6RoU0piYtYfYpKqOwB81PpjOtdRim8ExK4SGJY1B88tTZhPkzJdR6TJ1DWpF4ojjN+JI/LIvehwbo37XmnfQoNPBpYjFFtMrKLOwHcQPm3e/rXrihOo1hSDRJ/LMzC7i1EgGyFJNAe/bD3xDP1GHU+GJCdPHHGI2N7o3bkHgVbGzZ7VxWXDCnJxlL/wCSl+K/Rb/5MvqPjJ9PqZNLFpo0hBIB2gsz8bmJ47+bewzd/CfxhNqnGmn0zIAiSIwCrsDKDRAJ4X5fPjMVp/hZptb/PTNqGVHkYsNsXyA8c7ib+vGMh/wDCSwM+qDgtGdqQzbmmNntVbVH+wPqMp+LGO3KzSWBJdHUdRr9QlM2mcLZ+YbSPyzLaz4k1r6dZNOq26spJ+YNtPmPvLdH8u/HZe1nUfD6dDMm/M0aHxI/tYV4nYlgeaJ447HPLkklDoVsio9hXccA15Ad++T43jxzRt+9P/ALLbomhjmlHio/iaa1jW+CAxZyygD5rsd+R2q7dD0wGGMGRdNAi0tjjxLJLHcBxZ7Hvkeg0viRxx/JtRAz2w3kIflFqDsAI+U9rHfAvxJ8P6iYalzKFWCEkI0UQ3AMw+Ujd3rm/wDPKi5TlU6SJcoLcVbJpPiDSwqFjQrE2wLQLhfn+R1B+baDRDDjbfnlyP4k17pJJBpEdVrYzRPCzW38wyK3cCzzQvOdaPXpM27UyOdrAhkA2kCjx3+dvMnNX8Q9SXUJBFPqAgPzD+auOzSbgSQDRr2BvHVFJqT2g30rrnU9LJFqIYyZJwy0pUjYu3dQYKFQcC/IZXj6XrNUzmaMJGHdgN8THYWYirY/MTxnE+stDp+prK+pimhikbcYd1OwHlYE2OxB9sHdT+I5Znl8AyRROflEbE7h28zxWU8jKWOJ0nTfCWl0kviAySyLe3cykKCDZAX1ojk98taoNNGVjZ4z37rRr0NnMV0z4q1WkSI+Cm5EADGlYk9gD5jzN1xm86Z8SaXVuIvnjZhwjL8xP8Aslbv03AeWTGLn0Z5JqBruj6d447dizH1/sGG4zyMiJozNm05LTHbJ5iMsYrBqw4jrGSNmU+0Tqo0ehkmNWRtT6ngAe5v8AXNlqn25wL7bOqK+n0sK96Mj/iRf8AG/yxwXKdGGV1G2ZbpXwLN1DTQ60TgNKpXZQ3JttbLZP3VJBIuj3rMZqfjzX6fXGDTiKKGKRljjEQB27jsLkbizGrrj29M2v/wCKdVprH/Hc/wA2a+1NHz7R/wD9/Q+vFfR+N/wB2U+t/Erzq/wv4caalrWSWFFEhDA7igCgLR7AcivM4+Uqf2HFTp/0EG+HpOvMk+g3JPAHaQl2pXjP3flVq5CqSNvrvJrOb9G+ItRoL0+oQuiMymJhSghyCbHcEHi6I9r3v/2t9f0/wC0qunYODGDtliJ82r9R7ZjdV8S9S1U48UwiQ0GYRJTKCAfWwO3IrBjR2/pHxRo9Xsj3GGRqAVmWwTsUfMpI+YjjvsHc5p0Y+Zv2zC/D/wALxzyRzPphAyNuhnjkkQbTdUoIFVfY9s2Y+zrVf/Lav/8ApJv/AMf+WKLj+yZRkvRrkIIvyxb/fn81/9cFj7O9V/8ALav/AOkn/wDH/lix8l9lU/s+3RXqMS8X3ySqxuPLOUgay7cY9gF7nk+XqP6Yr4xFq4v3xx7l9CMY98SYFevbFXp+uO/wByvqf7Y9a3duKy/Qm2QsPy8jjdSABtUdvQ98MwtYwX1fpmpVvEiXcrG+OT+YxJ2Pykl0+gbq+lHUiN2TxKJ2/cKnmxyLsUeRgvU9I1kQIZLb5iB5qDZ+ZvlPnvOXNQOtSNHJqnhkDIJPEADqByC/By3p/g/qMqsYzqJlb5iQYzzV9rHmOc2j5E4KjL/p4SezadK+LpI9K3jB3lLFWK7WBFcFk2gLQ/rwv0r4im1BKmIqFWtw2m74uhX07ZrOj/F+oj0Uz6fUxxTK0m6WZG2hRtsAKCwPy3xYyD4d+I9RqNRNp9Pq01ZkQMjBWjAJccj5Fo/u3XGJ55Mp+LFbJNHrtZ01dKxRxPMWcSLuVU+UhbI57+fsMta/TdU1EEcrvMqSMlSMsDxne1AFlphV8duBnnxXro5ovA1TtDqFG1iSgQ87WBBPmP+sFdM676pAA2wHz8QfzQdRQrna1kEfTD8mV/YvHHYPTT9XjUbpNRTsVb5YHqRipXb/1j+g/EMkMfUYpGk/ogjBkjVVcKtyBmYqNxHezVnntcPU5R8O2nzOI4W8I/zZHjqR87XRUUODR75lZut60xj+ZgMS3vj3MhU3d7gCSGv9PzGGSTceS7QoxSdM6N0rVPqYvFdthK/JtYncWX5z4hBqvIAH2yPqHWNNGsUmpiimDiQ/zhJRjHwFcH7oG3d/qnPZvhTqlf0mID/ZmQ0f+EMV/CmteIxPqV25shXffsYUpKvG8gVd9jZzGOWXVFcF2D/iH4m09j+jS7ZkDON1KULHcKDm1sDjyehWZzqOs1GpjbUhjH4Q+XauwgFmvvZ5A8+9ZodX8H6oFfC1AayE+baa/4kVuD9O2P1PQdWkZWVQqkUQBwPqa7fW8e5dkviujJ9OnWZzLMPh+L2HheRfFGr1c7Lp4o2+blwCTuP+1VcDj8cGdX+E+pxaZNTEjMjWzqCpFg8sF80PfNV9mfR5IodRFKjKytsYMDYrhh9CaP0z1om0UUpj8Ms7cgK5BNdzRAs8WOMeRcVoWGaT2c01Wq1klM0RIA5+Uj9eKx/Seua+GRQ7ON1UWF7e47N+uapZJtfqZtKhi0sUDM4iV6CR0CS0g/M7WPy98HfEHRNNo45tTJrmTSTuGgWONWmPcEOOymuQSO3r5xzflUeT4qzP0Z6L8QzhkBZ9gH3P3m77fqKB9P1zX9I+IhCqo8m1LIUD7pHJ+fzb8iBnPfhv4W1uukeXTN4kcbIjeqE/aPxxQfTjoHxF8E6PVdNk1EgC6uGJ5F1S8Sbtu9efmLc0rUPwGdXjYpTg5P2Y+TmopKKRsvh3qQ1ce9o/BKkr9zg1yPvHvg/rnxJH0o7SaeSeQ/wB2hUUfViSAPp3wf8Hw/wA10/SrJo9QjxxDxFfby/Pzmxye9Gz5VkL/AA/r4Z5dNNpzDL4bNslYEEoCQRQoVXIy5q1/rlQjKKpj/6cXJSRnp/iPU/FM2m/klJ9DEzPPwN0kioLXbxwpHfmsJ9P6hLppVlhm+XsYzypXtwfPFeLKo+aeFSPMEk/lWN2p+82/wD9ux/Vj/lk4YXbY/K8hSSSRp+tdc/liHwE0ce8sCm1+OfPcAKFZR0Xw71hP+5z/wDcX/PK+hZx/wCk6v6x6f8A/wAeeoZD2bWBv+2Ih/8Axxmbmn0kSsMl/Q+3/vH/AFf/AI8WKTUn98R//cf/ADxY/Of2L8Y+4RjGz2xHjGsc6Uc48rGA4rf6H+mDGIxH9Mcw4/njTxjGRajCccL24wj1Af0f/2P/wARwUecAdI1F3Ex4ItT7Nx/zvJuXJIcUuLYPX1x4O4UO/6Hz/TJdRpsgopAe3cYploV6d2P1Hocj9T6Vp1JbTqqE0aHze3Cg+/bLmkNnGdR/d/vP8A8IzfIpRgkZ+NxllbbBmn1cunI8NqN1VWG74FpsgUfqMtf+JdeK/w/tlHXf7n/L+mLWdv/H5Ylkl9lrDH/waTp/U5pdPq2lkZ2VUCFuSLk58z6DCvw11nUxN4UMrR+KytQI2s1ACjxeZzQf+v/5v8A3HDSdtJ/7Q/+3OvDk5Uc2eFJ/wBmrn6nqGm1CzPu8Mx/uw+W21fL0wT0/qE7azb4jbfCjO0ngMW5OPZayPqf+9a/wDmT/8AEcrdL/31v+7j/wDiOKVuYJcYjPjDUTfylN/TSIfmUGm8hxwCB55pOkal46lXUzM0yoFLLyaCgAexzN9f/8AVN/5P/KuW+k/7t0z/wBqH8w+ajLts0SXBBPqUcuqXXEIrK0SoCZW5Qbj8q+uYPWfFGo0mjj0yPGdiyAuyh24diLv2zd6j/fv+b/7RnFvidv6Vp/+4/8AecebqRWFJyRm9Lr3RzLvYyN32nYzE8/ew30n4i1D6hxNM22OGR6Z2blDtABJ4/mxms6Z/vGn/53/uOZfR/7xqP+XH/5sz8XSM/Ijb0faOk/2f8A9T/3HMi3xM2v1XUJtfEj6ZRo3iif5S7tGUjDd/l+Yj3zWaH/AGT/APUf+45jNJ/ufU//AF/Tf+05z5H+SNL4+0f+n//Z",
  // Interior Remodeling (for future expansion)
  project6:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExMWFRUVGBUXFRUXFhYVFRcVFRYXFxUXFhYYHSggGBolGxcVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHSUrKy0rLS0tLi0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAEUQAAEDAgMEBgcECAUEAwAAAAEAAhEDIQQSMQVBUWEGInGBkaEHEzKxwdHwFEJysiMkM1JigsLhFUOSs/EWJHOjY4OT0v/EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAAqEQACAgICAgIBAwQDAAAAAAAAAQIRAyESMQQiQQUTUWFxMoGhweHwI//aAAwDAQACEQMRAD8A9bD2jdxHD5KdTDuAkoI1LApNq8LQYQKxTTsz7qaMqn6pSlVfqukqkKJcQKWN+4pm8JQ/JJkpJibHqJmG0JTRjIJ+aMpPDRCktkkxYpBqEXFIr6UJoGxq/XCkjIow7eB+KEp1JIQGPxFVWQmO1KZDiEWXyJqyGpKNqIGsiUJIdMKoslE0sJKLwFEGkPzVGKxJYdI/FOEhTZWyoWmEfjh6suVWDpCpUaHROY/VN5JidgMqUo/E4MMJlUvc2FdGRmkhg2kHhDsObEPTYXOuieXaebTZClsTVETT8cUNiGhzY80Fg9osqOAab+a1eHwzXNsVZ2MwtZmV0Jjhq+iO2vhuVXwnxVTejoa1Gp9Y2YteE45cZbK5Y3LoZYd0BXh4KzlbEYhrYEuAuY4pS9kUq0G4o/onfhPzCz20jeqftD5haF7g5h7j8wsztYfrcf5D80ZvQY9yC6Lz6oX4B+QTDBVnCkL/RHyQGHpk0W8f0bPkmOEYPQjkB8lVBvdl0lpHqSrdW+whUu0Ur0tvoFTnUKlbgpBqNgJap1VJKY1sMqHUEwEVSqVQ4kppVwUCYVLsLCmkMoBk+VIaKioqRTSUmWJgL2KllUyyGSsZUKm1yhc1UvepIYwqVJU2k3UZvD/KUuhUsMSpaXbRCv2W6KpP2R+Kt7U3sI6R1HtIMxss2nzKpr7QrPEEwByEDz1VNalD5K7NEOAKWm7QaD6kH5Gfo6nBSe86lPOrA6qUVtlyRl8S3M6RzWkwDfRg/JZt8ioRy4raYAD0TfD9q2Y/VbKsnei7GdWjQbq2g9qDp1A4WN1dRbJHzCw2W0V7QwhqMdEAgzKH2bgK9N5L9DfwWnZRkgHeAvcU0BhgSU0wizP8A6fJ1cE6p4VrRqkzSczgUyw9UuEGVp8vJKD0Z8MVJbKcU2GOP2XfIrN7bH66f8g+QWsrUx6t/wDlf8is3tz/AN0f8g+QUPIlcR4lUhnSb+ibP2R8kRhmQweKpwpmpTG8R8kzo0hHgo4VbZNukj/2Q==",
};

const MarqueeItem = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const itemRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

  const rotateX = useTransform(springY, [-0.4, 0.4], [3, -3]);
  const rotateY = useTransform(springX, [-0.4, 0.4], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current || !isHovered) return;
    const rect = (itemRef.current as HTMLElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.4;
    const yPct = (mouseY / rect.height - 0.5) * 0.4;
    x.set(xPct);
    y.set(yPct);
  };

  const getProjectImage = () => {
    // Map portfolio projects to service images
    const imageMapping: Record<string, string> = {
      "Colonial Roof Replacement": imageMap.project3,
      "Emergency Storm Repair": imageMap.project2,
      "Modern Siding & Windows": imageMap.project3,
      "Seamless Gutter System": imageMap.project2,
      "Custom Deck & Patio": imageMap.project3,
    };
    return imageMapping[project.title] || imageMap.project1;
  };

  return (
    <>
      <motion.div
        ref={itemRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          x.set(0);
          y.set(0);
        }}
        onMouseMove={handleMouseMove}
        onClick={() => setLightbox(true)}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformPerspective: 1200,
          scale: isHovered ? 1.02 : 1,
        }}
        className="relative w-[200px] sm:w-[240px] md:w-[280px] h-[280px] sm:h-[320px] md:h-[360px] flex-shrink-0 cursor-pointer will-change-transform transition-transform duration-300"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-gray-300/50">
          <img
            src={getProjectImage()}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />

          <motion.div
            className="absolute inset-0 bg-primary/20 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {isHovered && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          )}

          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
            <span className="inline-flex items-center gap-2 bg-secondary/40 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/30 w-fit mb-1 sm:mb-2">
              <span
                className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${project.accent}`}
              />
              <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-white">
                {project.category}
              </span>
            </span>

            <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1 leading-tight">
              {project.title}
            </h3>

            <div className="flex items-center gap-1.5 sm:gap-2 text-white/70 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
              <span className="truncate max-w-[80px] sm:max-w-none">
                {project.location}
              </span>
              <span className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-white/30" />
              <span>{project.year}</span>
            </div>

            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-white/80 text-[8px] sm:text-[10px] leading-relaxed mb-1 sm:mb-2 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="hidden xs:block">
                      <span className="text-white/40 text-[6px] sm:text-[8px] uppercase">
                        Service
                      </span>
                      <p className="text-white text-[8px] sm:text-[10px] font-light truncate max-w-[80px] sm:max-w-none">
                        {project.serviceRef || project.category}
                      </p>
                    </div>
                    <motion.button
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/30 backdrop-blur-sm rounded-lg text-white text-[8px] sm:text-[10px] font-medium flex items-center gap-0.5 sm:gap-1 hover:bg-primary/50 transition-colors border border-primary/30"
                      whileHover={{ x: 3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox(true);
                      }}
                    >
                      View
                      <svg
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white/20 text-2xl sm:text-3xl font-black">
            {project.number}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <PremiumLightbox
            image={getProjectImage()}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const InfiniteMarquee = ({
  projects,
  direction = "left",
  speed = 45,
}: {
  projects: any[];
  direction?: string;
  speed?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef(null);
  const animationRef = useRef<any>(null);

  const infiniteProjects = useMemo(() => {
    return [...projects, ...projects, ...projects, ...projects, ...projects];
  }, [projects]);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const itemWidth =
      window.innerWidth < 640 ? 216 : window.innerWidth < 768 ? 256 : 296;
    const totalWidth = itemWidth * projects.length;
    const distance = direction === "left" ? -totalWidth : totalWidth;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    gsap.set(marquee, {
      x: direction === "left" ? 0 : -totalWidth,
    });

    animationRef.current = gsap.to(marquee, {
      x: distance,
      duration: speed * (projects.length / 3),
      repeat: -1,
      ease: "none",
      modifiers: {
        x: (x: string) => {
          const value = parseFloat(x);
          if (direction === "left") {
            return value <= -totalWidth
              ? `${value + totalWidth}px`
              : `${value}px`;
          } else {
            return value >= 0 ? `${value - totalWidth}px` : `${value}px`;
          }
        },
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [direction, speed, projects]);

  useEffect(() => {
    if (!animationRef.current) return;
    if (isHovered) {
      animationRef.current.pause();
    } else {
      animationRef.current.resume();
    }
  }, [isHovered]);

  return (
    <div
      className="relative overflow-hidden py-3 sm:py-4 md:py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40 z-20 pointer-events-none bg-gradient-to-r from-background via-background/90 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40 z-20 pointer-events-none bg-gradient-to-l from-background via-background/90 to-transparent" />

      <div className="absolute inset-x-0 top-0 h-6 sm:h-8 md:h-12 z-20 pointer-events-none bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-6 sm:h-8 md:h-12 z-20 pointer-events-none bg-gradient-to-t from-background to-transparent" />

      <div
        ref={marqueeRef}
        className="flex gap-2 sm:gap-3 md:gap-4"
        style={{
          willChange: "transform",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        {infiniteProjects.map((project, index) => (
          <MarqueeItem key={`${project.number}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
};

const PremiumLightbox = ({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-secondary/98 backdrop-blur-xl flex items-center justify-center cursor-pointer p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-50 bg-gradient-to-r from-primary to-primary/80 backdrop-blur-md border border-primary/30 rounded-full px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-primary-foreground text-[10px] sm:text-xs font-medium hover:from-primary/90 hover:to-primary/70 transition-all"
        onClick={onClose}
      >
        Close
      </motion.button>

      <motion.img
        src={image}
        alt="Project preview"
        className="max-w-full max-h-[90vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </motion.div>
  );
};

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const headerParallax = useTransform(smoothProgress, [0, 1], [0, -30]);

  const { section, projects, button } = completeData.portfolio;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const row1 = projects.slice(0, 3);
  const row2 = projects.slice(2, 5);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-20" />
        <div className="absolute inset-x-0 bottom-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-20" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] opacity-10 sm:opacity-15 md:opacity-20" />

        <div className="hidden sm:block absolute top-40 -left-20 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-40 -right-20 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          style={{ y: headerParallax }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r from-primary to-primary/60" />
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-primary">
              {section.badge}
            </span>
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-l from-primary to-primary/60" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight px-2"
            dangerouslySetInnerHTML={{ __html: section.headline }}
          />
        </motion.div>

        <div className="space-y-1 sm:space-y-2 md:space-y-0">
          <InfiniteMarquee projects={row1} direction="left" speed={45} />
          <InfiniteMarquee projects={row2} direction="right" speed={40} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-8 sm:mt-10 md:mt-12"
        >
          <button className="p-4 sm:p-3 md:p-4  bg-gradient-to-r from-primary to-primary/80 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 sm:gap-2 hover:scale-105 hover:from-primary/90 hover:to-primary/70">
            {button.text}
            <svg
              width="14"
              height="14"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="relative block w-full h-8 sm:h-10 md:h-12 lg:h-16"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#portfolioWave)"
            d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
          />
          <defs>
            <linearGradient
              id="portfolioWave"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.03"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.05"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.03"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Portfolio;
